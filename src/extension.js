var vscode = require("vscode");
var projectRoot = vscode.workspace.rootPath;
var simpleGit = require("simple-git")(projectRoot ? projectRoot : ".");
var fs = require("fs");

function activate(context) {
  var outputChannel = vscode.window.createOutputChannel("Code-Journey");
  const state = stateManager(context);

  var disposableInit = vscode.commands.registerCommand(
    "codeJourney.doInit",
    function () {
      if (projectRoot === undefined) {
        vscode.window.showErrorMessage(
          "No directory open. Please open a directory first."
        );
      } else {
        simpleGit.init(function () {
          vscode.window.showInformationMessage(
            "Initiated git repository at " + projectRoot
          );
        });
      }
    }
  );

  // Get the earliest commit
  var disposableReset = vscode.commands.registerCommand(
    "codeJourney.doReset",
    function () {
      simpleGit.log({}, async function (error, result) {
        if (error) {
          showOutput(error);
          return;
        }
        const commitArr = [];
        result.all.reverse().forEach((commit, i) => {
          commitArr.push({
            id: i,
            hash: commit.hash,
          });
        });

        // Save the reverse commit hashes to global state
        await state.write("project", {
          project: commitArr,
        });
        await state.writeCurrentHash("current", {
          currentHash: commitArr[0].hash,
        });

        // Revert to the earliest commit
        simpleGit.revert(commitArr[0].hash, function (err, result) {
          if (err) {
            showOutput(err);
            return;
          }
          showOutput(result);
        });
      });
    }
  );

  var disposableWhatNext = vscode.commands.registerCommand(
    "codeJourney.doNext",
    async function () {
      // Retrieve the commit hashes from DB to identify the hash
      const { project } = await state.read("project");
      const { currentHash } = await state.readCurrentHash("current");

      showOutput(currentHash);

      let nextHash;
      project.forEach((commit, i) => {
        if (currentHash === commit.hash) {
          console.log("Match");
          if (i !== project.length - 1) {
            nextHash = project[i + 1].hash;
          }
        }
      });

      simpleGit.reset("hard", [nextHash], function (err, result) {
        if (err) {
          showOutput(err);
          return;
        }
        showOutput(result);
      });

      await state.writeCurrentHash("current", {
        currentHash: nextHash,
      });
    }
  );

  var disposableLogAll = vscode.commands.registerCommand(
    "codeJourney.doLogAll",
    function () {
      simpleGit.log({}, function (error, result) {
        if (error) {
          showOutput(error);
          return;
        }
        var last100 = result.all.slice(0, 100);
        var logs = fillCommits(last100);
        vscode.window.showQuickPick(logs).then(function (result) {
          if (result === null) {
            return;
          }
          simpleGit.show([result.description], function (error, result) {
            if (error) {
              throw error;
            }
            showSidebarDiff(result);
          });
        });
      });
    }
  );

  var disposableLogCurrentFile = vscode.commands.registerCommand(
    "codeJourney.doLogCurrentFile",
    function () {
      simpleGit.log(
        { file: vscode.window.activeTextEditor.document.fileName },
        function (error, result) {
          if (error) {
            showOutput(error);
            return;
          }
          var logs = fillCommits(result.all);
          vscode.window.showQuickPick(logs).then(function (result) {
            if (result === null) {
              return;
            }
            simpleGit.show([result.description], function (error, result) {
              if (error) {
                throw error;
              }
              showSidebarDiff(result);
            });
          });
        }
      );
    }
  );

  var disposableOriginCurrentPull = vscode.commands.registerCommand(
    "codeJourney.doOriginCurrentPull",
    function () {
      simpleGit.branch(function (error, branchSummary) {
        if (error) {
          showOutput(error);
          return;
        } else if (branchSummary.all.length == 0) {
          vscode.window.showErrorMessage(
            "No branches found. Git add files and commit maybe?"
          );
        } else {
          console.log(branchSummary);
          simpleGit.pull(
            "origin",
            branchSummary.current,
            function (err, update) {
              if (update && update.summary.changes) {
                showOutput(update.summary.changes);
              } else if (err) {
                showOutput(err);
              }
            }
          );
        }
      });
    }
  );

  var disposableAddRemote = vscode.commands.registerCommand(
    "codeJourney.doAddRemote",
    function () {
      vscode.window
        .showInputBox({
          placeHolder: "Enter remote name",
        })
        .then(function (remote) {
          if (!remote) {
            vscode.window.showErrorMessage(
              "You must enter a name for the remote"
            );
            return;
          }
          vscode.window
            .showInputBox({
              placeHolder: "Enter remote url",
            })
            .then(function (url) {
              if (!url) {
                vscode.window.showErrorMessage(
                  "You must enter a url for the remote"
                );
                return;
              }
              simpleGit.addRemote(remote, url, function (err, result) {
                if (err) {
                  showOutput(err);
                  return;
                }
              });
            });
        });
    }
  );

  var disposableCheckoutCurrentFile = vscode.commands.registerCommand(
    "giteasy.doCheckoutCurrentFile",
    function () {
      simpleGit.checkout(
        vscode.window.activeTextEditor.document.fileName,
        function (error, result) {
          if (error) {
            showOutput(error);
            return;
          }
        }
      );
    }
  );

  var disposableAddOrigin = vscode.commands.registerCommand(
    "codeJourney.doAddOrigin",
    function () {
      vscode.window
        .showInputBox({
          placeHolder: "Enter origin URL",
        })
        .then(function (message) {
          simpleGit.addRemote("origin", message, function (err, result) {
            if (err) {
              showOutput(err);
              return;
            }
          });
        });
    }
  );

  var disposableChangeBranch = vscode.commands.registerCommand(
    "codeJourney.doChangeBranch",
    function () {
      simpleGit.branch(function (error, branchSummary) {
        if (error) {
          showOutput(error);
          return;
        }
        console.log(branchSummary);
        var branches = [];
        branchSummary.all.forEach(function (element) {
          if (!element.startsWith("remotes/")) {
            if (element === branchSummary.current) {
              branches.push("(current) " + element);
            } else {
              branches.push(element);
            }
          }
        }, this);
        vscode.window.showQuickPick(branches).then(function (result) {
          if (result === null) {
            return;
          }
          if (!result.startsWith("(current)")) {
            simpleGit.checkout(result, function (error, result) {
              if (error) {
                showOutput(error);
              }
            });
          }
        });
      });
    }
  );

  var disposableCreateBranch = vscode.commands.registerCommand(
    "codeJourney.doCreateBranch",
    function () {
      vscode.window
        .showInputBox({
          placeHolder: "Enter new branch name",
        })
        .then(function (branchName) {
          simpleGit.checkoutLocalBranch(branchName, function (error, result) {
            if (error) {
              showOutput(error);
            }
          });
        });
    }
  );

  var disposableStatus = vscode.commands.registerCommand(
    "giteasy.doStatus",
    function () {
      var fileList = [];
      simpleGit.status(function (error, status) {
        console.log(status);
        if (error) {
          showOutput(error);
          return;
        }
        fileList = fillFileList(status, fileList, false);

        var qp = vscode.window.showQuickPick(fileList);
        qp.then(function (result) {
          if (result === null) {
            return;
          }
          if (["Untracked", "New"].indexOf(result.description) >= 0) {
            return;
          } else {
            simpleGit.diff([result.label], function (error, result) {
              if (error) {
                throw error;
              }

              var diffFile = os.tmpdir() + "/.git-easy.diff";

              fs.writeFile(diffFile, result, (err) => {
                if (err) {
                  throw err;
                }
                vscode.workspace
                  .openTextDocument(diffFile)
                  .then(function (file) {
                    vscode.window.showTextDocument(
                      file,
                      vscode.ViewColumn.Two,
                      false
                    );
                  });
              });
            });
          }
        });
      });
    }
  );

  context.subscriptions.push(disposableInit);
  context.subscriptions.push(disposableReset);
  context.subscriptions.push(disposableWhatNext);
  context.subscriptions.push(disposableOriginCurrentPull);
  context.subscriptions.push(disposableStatus);
  context.subscriptions.push(disposableLogAll);
  context.subscriptions.push(disposableAddOrigin);
  context.subscriptions.push(disposableAddRemote);
  context.subscriptions.push(disposableChangeBranch);
  context.subscriptions.push(disposableCreateBranch);
  context.subscriptions.push(disposableLogCurrentFile);
  context.subscriptions.push(disposableCheckoutCurrentFile);

  // Utilities

  var fillCommits = function (listOfCommits) {
    var logs = [];
    listOfCommits.forEach(function (element) {
      if (!element.hasOwnProperty("hash")) {
        return;
      }
      logs.push({
        label: element.message,
        detail:
          timeSince(new Date(element.date)) +
          " by " +
          (element.author_name || element.author_email) +
          " | " +
          element.date,
        description: element.hash.substring(0, 7),
      });
    }, this);
    return logs;
  };

  function stateManager(context) {
    return {
      read,
      write,
      readCurrentHash,
      writeCurrentHash,
    };

    function read(key) {
      return {
        project: context.globalState.get(key),
      };
    }

    function readCurrentHash(key) {
      return {
        currentHash: context.globalState.get(key),
      };
    }

    async function write(key, newState) {
      await context.globalState.update(key, newState.project);
    }

    async function writeCurrentHash(key, newState) {
      await context.globalState.update(key, newState.currentHash);
    }
  }

  function showSidebarDiff(text) {
    fs.writeFile("/tmp/.code-journey.diff", text, (err) => {
      if (err) {
        throw err;
      }
      vscode.workspace
        .openTextDocument("/tmp/.code-journey.diff")
        .then(function (file) {
          vscode.window.showTextDocument(file, vscode.ViewColumn.Two, false);
        });
    });
  }

  function showOutput(text) {
    outputChannel.clear();
    outputChannel.append(text);
    outputChannel.show(vscode.ViewColumn.Three);
  }

  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }
}
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;

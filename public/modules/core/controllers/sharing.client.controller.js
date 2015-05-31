/*
* @Author: Bhargav Krishna
* @Date:   2015-05-30 15:46:34
* @Last Modified by:   Bhargav Krishna
* @Last Modified time: 2015-05-31 12:52:30
*/

/* global plupload, plUploadHtml5, jQuery */

'use strict';
angular.module('core').controller('SharingController', ['$scope', '$state', 'Authentication', 'FolderService', 'UserService',
  function($scope, $state, Authentication, FolderService, UserService) {
    var no_files = 0;
    var processed = 0;
    var fileMap = {};
    (function init() {
      var x = new plUploadHtml5(window, document, plupload);
    }());

    (function onresize() {
      jQuery('.drop-target').css('height', jQuery(window).height() - 150 + 'px');
      jQuery('#file-share').css('height', jQuery(window).height() - 120 + 'px');
    }());

    this.files = FolderService.list();
    this.noDragDrop = false;
    var folders = {};
    var that = this;
    var uploader = new plupload.Uploader({
        runtimes: 'html5',
        drop_element: 'drop-target',
        browse_button: 'drop-target',
        max_file_size: '5000mb'
    });
    $scope.getFiles = FolderService.list;
    uploader.bind('Init', function(up, params) {
        if (uploader.features.dragdrop) {

            var target = jQuery('drop-target');

            target.ondragover = function(event) {
                event.dataTransfer.dropEffect = 'copy';
            };

            target.ondragenter = function() {
                this.className = 'dragover';
            };

            target.ondragleave = function() {
                this.className = '';
            };

            target.ondrop = function() {
                this.className = '';
            };
        }
        else
          that.noDragDrop = true;
    });

    function populateHashAndUpload(torrent) {
      fileMap[torrent.name].infoHash =  torrent.infoHash;
      processed++;
      if(processed === files.length)
        UserService.uploadFiles(FolderService.list()).then(function(){console.log('files updated !!');});

    };

    function addFiles(up, files) {
      no_files = files.length;
      var fileName,
        folderNames,
        folderName,
        folder,
        file,
        length,
        parent,
        prefix='',
        isFolderExists;
        for (var j in files) {
          prefix='';
          parent=null;
          fileName = files[j].relativePath;
          folderNames = fileName.split('/');
          length = folderNames.length;
          for (var i = 0; i<length-1; i++) {
            folderName = folderNames[i];
            isFolderExists = folders[prefix+'/'+folderName];
            folder = folders[prefix+'/'+folderName] || {
              id : files[j].id,
              name : folderName,
              type : 'folder',
              childs : []
            };
            folders[prefix+'/'+folderName] = folder;
            if(!parent && !isFolderExists) {
              FolderService.add(folder);
            }
            else if(parent && !isFolderExists){
              parent.childs.push(folder);
            }
            parent = folder;
            prefix+=('/'+folderName);
          }
          fileName = fileName.substring(fileName.lastIndexOf('/')+1);
          file = {
            id : files[j].id,
            name : fileName,
            type : 'file',
            size : files[j].size
          };

          if(parent)
            parent.childs.push(file);
          else
            FolderService.add(file);
          fileMap[file.name] = file;
          console.log("generating the hashes for pieces");
          //window.onFiles([files[j]], populateHashAndUpload);
          //$('debug').innerHTML += '<div id="' + files[i].id + '">- ' + files[i].relativePath + ' (' + plupload.formatSize(files[i].size) + ')</div>';

        }
        UserService.uploadFiles(FolderService.list()).then(function(){console.log('files updated !!');});
        console.log('files loaded !!!');
        $state.reload();
    }
    uploader.bind('FilesAdded', addFiles);
    uploader.init();

    this.getFileType = function getFileType(file) {
      if(file.type === 'folder') {
        return 'fa-folder';
      }
      return 'fa-file-o';
    };
  }
]);

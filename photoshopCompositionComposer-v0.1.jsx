var userDisplayDialogsPref = app.displayDialogs;

app.displayDialogs = DialogModes.ALL;

var savePath;

app.displayDialogs = DialogModes.NO;

function getType(thing){
    if(thing === null) return "[object Null]"; // special case
    return Object.prototype.toString.call(thing);
}

function getCombinations(arr, n) {
  if (n == 1) {
      var ret = [];
      for (var i = 0; i < arr.length; i++) {
          for (var j = 0; j < arr[i].length; j++) {
              ret.push([arr[i][j]]);
          }
      }
      return ret;
  } else {
      var ret = [];
      for (var i = 0; i < arr.length; i++) {
          var elem = arr.shift();
          for (var j = 0; j < elem.length; j++) {
              var childperm = getCombinations(arr.slice(), n - 1);
              for (var k = 0; k < childperm.length; k++) {
                  ret.push([elem[j]].concat(childperm[k]));
              }
          }
      }
      return ret;
  }
}

function showAllArtLayers() {
  for(var i = 0; i < layerSets.length; i++) {
    for(var z = 0; z < layerSets[i].artLayers.length; z++) {
      layerSets[i].artLayers[z].visible = true;
    }
  }
}

function hideAllArtLayers() {
  var layerSets = app.activeDocument.layerSets;

  for(var i = 0; i < layerSets.length; i++) {
    if(layerSets[i].artLayers.length) {
      for(var z = 0; z < layerSets[i].artLayers.length; z++) {
        layerSets[i].artLayers[z].visible = false;
      }
    } else {
      for(var z = 0; z < layerSets[i].layerSets.length; z++) {
        layerSets[i].layerSets[z].visible = false;
      }
    }
  }
}

function getArtLayerCollectionCollection() {
  var layerSets = app.activeDocument.layerSets,
      artLayerCollectionCollection = [];

  for(var i = 0; i < layerSets.length; i++) {
    var artlayerCollection = [];
    if(layerSets[i].artLayers.length) {
      for(var z = 0; z < layerSets[i].artLayers.length; z++) {
        if(layerSets[i].name.indexOf('__') !== 0)
          artlayerCollection.push(layerSets[i].artLayers[z]);
      }
    } else {
      for(var z = 0; z < layerSets[i].layerSets.length; z++) {
        if(layerSets[i].name.indexOf('__') !== 0)
          artlayerCollection.push(layerSets[i].layerSets[z]);
      }
    }
    artLayerCollectionCollection.push(artlayerCollection);
  }

  return artLayerCollectionCollection;
}

function combine() {
  var artLayerCollectionCollection = getArtLayerCollectionCollection(),
      artLayerCollectionCollectionCombinations = getCombinations(artLayerCollectionCollection, getLayerSetsCount()),
      continueConfirmation;

      if(! artLayerCollectionCollectionCombinations.length) return alert('Script has aborted. No combinations found. Please make sure no empty groups are present.');

      continueConfirmation = confirm(artLayerCollectionCollectionCombinations.length + " combinations found. Would you like to continue?");

      if(! continueConfirmation ) return alert('Script has been aborted.');

      savePath = Folder.selectDialog("Select an output folder");

      var includePSDFiles = confirm('Would you like to include corresponding PSD documents?')

      for(var i = 0; i < artLayerCollectionCollectionCombinations.length; i++) {
        hideAllArtLayers();
        var artLayerNames = [];
        for(var z = 0; z < artLayerCollectionCollectionCombinations[i].length; z++) {
          var artLayer = artLayerCollectionCollectionCombinations[i][z];
          artLayer.visible = true;
          artLayerNames.push(artLayer.parent.name);
          artLayerNames.push(artLayer.name);
        }
        saveDocumentAsPNG(savePath + '/' + normalizeSaveFileName(artLayerNames.join('')).substr(0, 254));
        if(includePSDFiles) saveDocumentAsPSD(savePath + '/' + normalizeSaveFileName(artLayer.parent.name + artLayerNames.join('')).substr(0, 254));
      }
}

function getSmallestLayerSetCount() {
  var count = null,
  layerSets = app.activeDocument.layerSets;

  for(var i = 0; i < layerSets.length; i++) {
    var artLayers = layerSets[i].artLayers;

    if(count === null) count =  artLayers.length;

    if(artLayers.length < count) count = artLayers.length;
  }

  return 1;
}

function getLayerSetsCount() {
  var layerSets = app.activeDocument.layerSets,
      count = 0;

  for(var i = 0; i < layerSets.length; i++) {
    if(layerSets[i].name.indexOf('__') !== 0) count++;
  }

  return count;
}

function normalizeSaveFileName(name) {
  return name;
}

function saveDocumentAsPNG(path) {
  app.activeDocument.saveAs(new File(path), new PNGSaveOptions());
}

function saveDocumentAsPSD(path) {
  app.activeDocument.saveAs(new File(path), new PhotoshopSaveOptions());
}

combine();

app.displayDialogs = userDisplayDialogsPref;
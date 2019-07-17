
const path = require("path")
const config = require("../config/index")


exports.assetsPath = function(_path){

    if(config.isDev){
        _path = _path.replace("chunkHash","hash")
    }

  return path.join(config.assetsSubDirectory, _path)
}

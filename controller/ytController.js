const YoutubeMp3Downloader = require("youtube-mp3-downloader");
 
const YD = new YoutubeMp3Downloader({
    "ffmpegPath": "./controller/codec/ffmpeg.exe",        
    "outputPath": "./public/converted_files",
    "youtubeVideoQuality": "highest",
    "queueParallelism": 2,
    "progressTimeout": 2000
})


function ytConvert(url, cb){
    YD.download(url.split('=')[1])
 
    YD.on("finished", (err, data) => {
        if(err) cb(err)
        cb(null, data)
    })
    
    YD.on("error", (error) => {
        console.log(error)
    })
}

module.exports = {
    'ytConvert': ytConvert
}
const protobuf = require("protobufjs");
const getTime = timeNumber => {
    const sec = ~~timeNumber/10
    return `${~~(sec / 60)}:${(sec % 60).toFixed()}`
}


const url = process.argv[process.argv.length - 1]
const query = url.split('?').reverse()[0]

const root = protobuf.loadSync("./ik.proto")
const RoastProfile = root.lookupType("ikawapackage.RoastProfile")
const buffer = Buffer.from(query,'base64');
const decoded = RoastProfile.decode(buffer).toJSON()
console.log(decoded)

console.log(`烘焙曲线名称： ${decoded.name}`)

console.log(`风温节点：`)
decoded.tempPoints.forEach(({temp, time}, index) => {
    console.log(`节点${index+1}: ${getTime(time)}  -  ${(temp/10).toFixed()}℃`)
})

console.log(`风扇节点：`)
decoded.fanPoints.forEach(({power, time}, index) => {
    console.log(`节点${index+1}： ${getTime(time)}  -  ${(power/2.55).toFixed()}%`)
})

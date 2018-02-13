import axios from 'axios'

// 下载模板

    export const downloadTemplate = function (scheduleType) {
    	var url = "http://10.1.31.28:8080" +"/teamOrgaInfo/homePage"; //下载模板的接口
        axios.get(url, {
            params: {
                "scheduleType": scheduleType
            },
//          responseType: 'arraybuffer'
        }).then((response) => {
            //创建一个blob对象,file的一种
            console.log(response)
            let blob = new Blob([response.data], { type: 'application/x-xls' })
            console.log(blob)
            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
//          link.download = fileNames[scheduleType] + '_' + response.headers.datestr + '.xls'
            link.download =  'out.xls'
            
            link.click()
        })
    }
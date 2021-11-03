/**
 * Created by lihanying on 2018/7/31.
 */
//导出报表
export function clickDownload(columns,list){
    let str = [],title = [];
    columns.map(item=>{
        title.push(item.title)
    });
    str.push(title.join(","));
    for(let i = 0; i < list.length; i++){
        let temp = [];
        for(let j = 0; j < columns.length; j++){
            temp.push(list[i][columns[j].dataIndex])
        }
        str.push(temp.join(","));
    }
    str =  encodeURIComponent(str.join("\n"));
    return "data:text/csv;charset=utf-8,\ufeff"+str;

}

const columns = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
    }, {
        title: '商品名称',
        dataIndex: 'commodity_name',
        key: 'commodity_name',
    }, {
        title: '商品分类',
        dataIndex: 'type_name',
        key: 'type_name',
    }, {
        title: '零售价',
        dataIndex: 'cprice',
        key: 'cprice',
    },
];

//使用
<Button style={{backgroundColor:'#1AAD19'}}>
    <a id="test" href={clickDownload(columns,[])} download="downlaod.csv" style={{color:'white'}}>导出报表</a>
</Button>
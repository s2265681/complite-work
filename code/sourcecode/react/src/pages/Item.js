
import React,{useEffect,useState} from 'react'
import SeachItem from  '../components/SeachItem/SeachItem'
import ItemList from  '../components/SeachItem/ItemList'

const searchItem = {
    data1: {
       label:'动物',
       data: [
        {
          label: '全部',
          key: 0,
        },
        {
          label: '猫',
          key: 1,
        },
        {
          label: '狗',
          key: 2,
        },
      ],
    },
    data2: {
      label:'植物',
      data: [
       {
         label: '全部',
         key: 0,
       },
       {
         label: '含羞草',
         key: 1,
       },
       {
         label: '鲜花',
         key: 2,
       },
     ],
   },
   data3: {
    label:'景点',
    data: [
     {
       label: '全部',
       key: 0,
     },
     {
       label: '长城',
       key: 1,
     },
     {
       label: '西湖',
       key: 2,
     },
   ],
 }
}

const itemData = [{
  id:1,
  kind:'动物',
  key:2,
  content:'这是个拉布拉多',
  itemUrl:'https://dss0.baidu.com/73t1bjeh1BF3odCf/it/u=904688732,1589128815&fm=85&s=2110599148717A960EC85DC60300E0B2',
  title:'拉布拉多'
},{
  id:2,
  kind:'动物',
  key:2,
  content:'这是个柴犬',
  itemUrl:'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=1067412999,107277101&fm=5',
  title:'柴犬'
},
{
  id:3,
  kind:'动物',
  key:1,
  content:'这是个猫',
  itemUrl:'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2247692397,1189743173&fm=5',
  title:'猫'
},{
  id:4,
  kind:'植物',
  key:1,
  content:'这是个含羞草',
  itemUrl:'https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2352760212,816094440&fm=85&app=52&f=JPEG?w=121&h=75&s=412FE2FACC5753E7243482230300D0D7',
  title:'含羞草'
},
{
  id:5,
  kind:'植物',
  key:2,
  content:'这是个玫瑰',
  itemUrl:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1585944621816&di=7186c345394ec523655d9e7658c74de9&imgtype=0&src=http%3A%2F%2Fa4.att.hudong.com%2F40%2F66%2F14300001018588129620664988587.jpg',
  title:'玫瑰'
},{
  id:6,
  kind:'景点',
  key:1,
  content:'这是长城',
  itemUrl:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1598423979,2874361609&fm=26&gp=0.jpg',
  title:'长城'
},{
  id:7,
  kind:'景点',
  key:2,
  content:'这是西湖',
  itemUrl:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1604468858,3204536097&fm=26&gp=0.jpg',
  title:'西湖'
}]


const Item = () =>{
  const [initChoose, setChoose] = useState([])
  const [itemList , setItemList] = useState(itemData)

  useEffect(() => {
    let initArr = [];
    Object.keys(searchItem).forEach(el=>{
      let initObj ={};
      let label = searchItem[el].label
      initObj.label = label
      initObj.key = 0
      initArr.push(initObj)
    })
    setChoose(initArr)
  }, [])
  
  // 选择筛选条件
  function chooseItem(lab,k,elI){
    initChoose[elI].key = k
    // 筛选结果
    let filterItem= [];
    let resItem = []
    initChoose.forEach((el,i)=>{
      filterItem = itemData.filter(it => el.label ===it.kind && (el.key ===0 || it.key===el.key) )
      resItem.push(...filterItem)
    })
    setItemList(resItem.slice())
    setChoose(initChoose.slice())
  }

  // console.log(initChoose,'initChoose')

  return(
    <div>
       <SeachItem searchItem={searchItem} initChoose={initChoose} onChoose={(lab,k,elI)=>chooseItem(lab,k,elI)}/>
       <ItemList itemData={itemList}/>
    </div>
  )
}

export default Item;
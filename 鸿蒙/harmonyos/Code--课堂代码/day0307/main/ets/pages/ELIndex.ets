import {ELMain} from "../components/ELMain"
import {ELCart} from "../components/ELCart"
import {ELFooter} from "../components/ELFooter"
import axios from "@ohos/axios"
import { CartFood, Category,KEY} from '../module/Index'

//创建一个持久化的仓库
PersistentStorage.PersistProp(KEY,"[]")

@Entry
@Component
struct ELIndex{
  @State showCart:boolean=false
  @State CategoryList:Category[]=[]

  //获取仓库数据
  @StorageLink(KEY)
  @Watch("update")
  CartJSON:string="[]"

  //ELAddCut 要使用仓库里面的数据，可以使用祖先和后代的传递方式
  @Provide CartList:CartFood[]=JSON.parse(this.CartJSON)

  update(){//仓库数据更新，立刻同步更新CartList
    this.CartList=JSON.parse(this.CartJSON)
  }

  //在build()之前，执行的钩子，注意：不能 async await
  aboutToAppear(){
    this.getData()
  }

  async getData(){
    try {
      let result=await axios.get("http://192.168.1.14:3000/listData")
      // AlertDialog.show({
      //   message:JSON.stringify(result.data)
      // })
      this.CategoryList=result.data

    }catch(err){
      AlertDialog.show({
        message:JSON.stringify(err)
      })
    }
  }

  build() {
    Stack({alignContent:Alignment.Bottom}){
      ELMain({CategoryList:$CategoryList})
      if(this.showCart){
        ELCart({CartList:$CartList})
      }
       ELFooter({showCart:$showCart,CartList:$CartList})
    }
    .width("100%")
    .height("100%")
  }
}





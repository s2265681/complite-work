import {ELMain} from "../components/ELMain"
import {ELCart} from "../components/ELCart"
import {ELFooter} from "../components/ELFooter"
import axios from "@ohos/axios"
import { Category } from '../module/Index'

@Entry
@Component
struct ELIndex{
  @State showCart:boolean=false
  @State CategoryList:Category[]=[]
  //在build()之前，执行的钩子，注意：不能 async await
  aboutToAppear(){
    this.getData()
  }

  async getData(){
    try {
      let result=await axios.get("http://192.168.1.13:3000/listData")
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
        ELCart()
      }
      ELFooter()
    }
    .width("100%")
    .height("100%")
  }
}





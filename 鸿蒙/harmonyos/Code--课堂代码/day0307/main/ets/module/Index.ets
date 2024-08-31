export class Category{
  tag:string=""
  name:string=""
  foods:FoodItem[]=[]
}

export class FoodItem{
  id: number=0
  name: string=""
  positive_reviews: string=""
  monthly_sales: number=0
  food_label_list: string[]=[]
  price:number=0
  picture:string=""
  description:string=""
  tag: string=""
}

//创建一个持久化的仓库，存储购物车的数据
//存储到仓库里面数据的格式
export class CartFood{
  id:number=0
  name:string=""
  picture:string=""
  price:number=0
  count:number=0 //数量
}

//创建仓库名称 并且 导出
export const KEY="user_Cart"

//添加购物车（添加到仓库里）方法
//空（ELMain的列表）---FoodItem--转化--CartFood--存储
//ELCart的列表-----CartFood--直接存储
export const addCart=(food:FoodItem|CartFood)=>{
  //先获取购物车
  const CartJSON=AppStorage.Get<string>(KEY)||"[]";
  const CartList=JSON.parse(CartJSON) as CartFood[]
  //判断一下是否存在该商品
  const item=CartList.find(item=>item.id===food.id)
  //已经存在该商品 1=2=3
  if(item){
    item.count++
  }else{ //没有存在该商品(新增一项商品） 0-1
    let {name,picture,price,id}=food
    const cartfood={id,name,picture,price,count:1}
    CartList.push(cartfood)
  }
  //最终写入到仓库里
  AppStorage.Set<string>(KEY,JSON.stringify(CartList))
}

//减
export const delCart=(id:number)=>{
  //先获取购物车
  const CartJSON=AppStorage.Get<string>(KEY)||"[]";
  const CartList=JSON.parse(CartJSON) as CartFood[]
  //判断一下是否存在该商品
  const item=CartList.find(item=>item.id===id)
  if(item){
     item.count--
     if(item.count<=0){
       const index=CartList.findIndex(item=>item.id==id)
       CartList.splice(index,1)
     }
  }
  //更新一下仓库
  AppStorage.Set<string>(KEY,JSON.stringify(CartList))
}

//清空仓库
export const delAllCart=()=>{
  AppStorage.Set<string>(KEY,"[]")
}
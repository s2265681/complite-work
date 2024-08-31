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
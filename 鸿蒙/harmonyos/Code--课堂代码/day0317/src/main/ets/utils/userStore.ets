
import preferences from '@ohos.data.preferences'

export class User{
  name:string
  age:number
}

export const USER_STORE="My_User_Store"
export const USER_KEY="user_key"

export class  UserStore{
  //1.先获取首选项实例
  getStore(){
    return preferences.getPreferences(getContext(this),USER_STORE)
  }
  //通过首选项实例来 增 删 改
  //获取用户信息
  async getUser(){
    const store=await this.getStore()
    let data=await store.get(USER_KEY,"{}") as string
    return JSON.parse(data) as User
  }
  //修改用户信息
  async setUser(user:User){
    const store=await this.getStore()
    await store.put(USER_KEY,JSON.stringify(user))
    await store.flush() //写入更新
  }
  //删除用户信息
  async delUser(){
    const store=await this.getStore()
    await store.delete(USER_KEY)
    await store.flush()//写入更新
  }

}



# coding=utf-8


# todo 12.3 读写二进制字节

# todo  read(size=-1)    size是读取字节  -1 是没有限制  
# todo  readline (size=-1)   一行字节
# todo  readlines()  多行字节 
# todo  write(b)  写入字节
# todo  writelines(lines)   写入一个字节列表
# todo  flush() 刷新写缓冲区

#* 案例  复制二进制文件

f_name = '/Users/shangjiawei/Desktop/complite-work/python/基础/05、文件操作/logo.jpeg'
with open(f_name,'rb') as f:
    b = f.read()
    print(b)
    copy_f_name = '/Users/shangjiawei/Desktop/complite-work/python/基础/05、文件操作/logo2.jpeg'
    with open(copy_f_name,'wb') as copy_f:
        copy_f.write(b)
        print('文件复制成功')

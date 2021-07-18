# coding=utf-8


# todo 12.3 读写文本文件

# todo  read(size=-1)    size是读取字符数  -1 是没有限制  
# todo  readline (size=-1)   读取换行符或文件尾时返回单行字符串
# todo  readlines()  地区文件数据到一个字符串列表中，每一行数据都是列表的一个元素 lines
# todo  write(s)  写入文件中，返回一个字符数
# todo  writelines(lines)   写入一个字符串列表
# todo  flush() 刷新写缓冲区 在文件没有关闭情况下将数据写入文件中 不常用

#* 案例  复制文本文件

f_name = '/Users/shangjiawei/Desktop/complite-work/python/基础/05、文件操作/test.txt'
with open(f_name,'r') as f:
    lines = f.readlines()
    print(lines)
    copy_f_name = 'dest_file.txt'
    with open(copy_f_name,'w') as copy_f:
        copy_f.writelines(lines)
        print('文件复制成功')

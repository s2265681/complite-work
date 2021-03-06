# 输入一个URL做了什么？

### 理解：

**一、 网络通信方面**

1、 网路分层

- why？ 使计算机间的识别数据传输通讯和网络互联等复杂的问题简单化

- what? 

  **OSI体系结构：** 1、物理层 2、数据链路层 3、网络层 4、运输层 5、会话层 6、表示层 7、应用层

  **TCP/IP体系结构**：1、网络接口层 2、网络层IP 3、运输层 4、应用层

  **五层协议的体系结构：** 1、 物理层 2、数据链路层 3、 网络层 4、运输层 5、应用层

- 物理层：通过物理手段将设备链接在一起：传输0/1电信号（比特流）

- 数据链路层：规定了一套协议，专门给0/1信号进行分组，规定不同的组代表什么意思--以太网协议

- 网络层（主机到主机的通信）：只有同一个子网内的计算机可以完成广播，不是一个子网，会发给网关，由网关转发

- IP协议：判断两个计算机是否在同一个子网中

- 子网掩码：规定网络部分全为1，主机部分全为0，通过IP地址和子网掩码and运算，对结果对比判断是否在同一个子网下。

- ARP协议：通过广播的形式携带着要发送给对方的IP地址，对方收到包后会解析对比IP地址，匹配则把自己的MAC地址交给对方。

- 运输层（建立端到端的通信）：通过物理层/数据链路层以及网络层的互相协调，可以成功的把数据从计算机A传到计算机B，但是计算机B中有多个应用程序，计算机不知道将数据发给哪个应用程序，所以端口上场了，端口范围0～65535，前1023个端口被系统占用， 传输层常见两大协议TCP协议和UDP协议

- UDP协议：用户数据报协议，无连接的协议，与TCP协议一样用于处理数据包

  特点：面向无连接、单播、多播、广播、不可靠性、头部开销小，传输数据报文高效，----直播

- TCP协议

  传输控制协议，是一种面向连接的、可靠的、基于字节流的传输层通讯协议，TCP是面向连接的可靠的协议流，不间断的数据结构流通传输  --- 不丢包

- TCP三次握手

​       1、你好，是小刘吗？ 2、 是的，你是面试官吗   3、对我是 

​        【1】、客户端向服务端发送连接请求报文段，该报文段中包含自身的数据通讯初始序列号，请求发送后，客户端进入`SYN-SENT`状态

​       【2】、服务端收到请求报文段后，如果同意连接，会发送一个应答，应答中也包含自身的数据通讯初始序号，发送完成后，进入`SYN-RECEIVED`状态

​        【3】、当客户端收到连接同意应答后，向服务端发送一个确认报文，发送完后进入`ESTABLISHED`状态，服务端收到这个应答后也进入`ESTABLISHED`

​     为什么三次而不是两次：防止网络异常，出现失效的连接请求报文段被服务端接收的情况，产生错误

- TCP的四次挥手

  1、 您的情况我知道了，等通知吧

  2、好的好的

  3、希望可以一起共事

  4、滴滴。。

  【1】、若客户端A任务数据发送完成，则向服务端B发送连接释放请求。

  【2】、B收到后，告诉应用层释放TCP连接，然后发送ACK包，并进入`CLOSE_WAIT`状态，表示A到B的连接释放了，B不再接收A的请求了，但是B此时仍可发给A

  【3】、B此时还有数据会继续发送，完毕后会向A发送释放请求，然后B进入`LAST-ACK`状态

  【4】、A收到释放请求后，向B发送确认应答，此时A进入`TIME-WAIT`状态，该状态会持续一段时间2MSL，如果该时间段内没有B的重发请求，就进入`CLOSED`状态，B收到应答也进入`CLOSED`状态

- 为何客户端最后还等待2MSL

​       客户端需要保证最后一次发送的ACK报文到服务器，如果服务器未收到，可以请求客户端重发，这样客户端还有时间再发，重启2MSL计时

- TCP/IP的并发限制

​      浏览器对同一个域名下的并发的TCP连接是有限制的(2-10个)

​      而且在HTTP1.0中往往一个资源下载就需要对应一个TCP/IP请求

- TCP协议特点

​       1、面向连接，是指发送数据之前必须在两端建立连接，建立连接的方法就是 `三次握手`，这样能建立可靠的连接，为数据的可靠传输打下了基础

​      2、仅支持单播传输

​      3、面向字节流：不像UDP那样一个个报文独立传输，而是1⃣️字节流方式进行传播

​      4、可靠传输：对于可靠传输，判断丢包，误码靠的是TCP的段编号以及确认号

​      5、提供拥塞控制

​      6、TCP提供全双工通信

| 对比     |                     UDP                     | TCP                                    |
| :------- | :-----------------------------------------: | :------------------------------------- |
| 是否连接 |                   无连接                    | 面向连接                               |
| 是否可靠 |    不可靠传输，不使用流量控制和拥塞控制     | 可靠传输，使用流量控制和拥塞控制       |
| 连接个数 |   支持一对一，一对多，多对一和多对多通信    | 只能一对一通信                         |
| 传输方式 |                  面向报文                   | 面向字节流                             |
| 首部开销 |             首部开销小，仅8字节             | 首部最小20字节，最大60字节             |
| 适用场景 | 适用于实时应用 ( IP电话、视频会议、直播等 ) | 适用于要求可靠传输的应用，例如文件传输 |

TCP向上层提供面向连接的可靠服务 ，UDP向上层提供无连接不可靠服务

虽然 UDP 并没有 TCP 传输来的准确，但是也能在很多实时性要求高的地方有所作为

对数据准确性要求高，速度可以相对较慢的，可以选用 TCP

- 应用层

 应用层是最接触用户的，上面基层收到了传输层的数据后，TCP/UDP协议传来各种程序的包后，需要不同的协议来规定数据的格式，才能渲染解读，如网络HTTP协议，文件传输FTP协议，电子邮箱SMTP、域名解析DNS，远程登录Telnet协议等

- DNS是什么

  `Domain Name System` 域名系统，是一种组织成域层次结构的计算机和网络服务命名系统，用于TCP/IP网络，作用将域名和IP地址相互映射的一个分布式数据库，主机名和域名转换成IP地址的工作  

- 为什么需要DNS

  网络通讯大部分基于TCP/IP协议，他们是基于IP地址的，所以计算机在网络上进行通讯时只能识别252.9.4.131.12之类的IP地址，而不能认识域名

- 域名结构

 www.qq.com.   

. 代表根域名 com是一级域名 qq是二级域名 www是三级域名

 .  -> .com -> qq.com -> www.qq.com

​     

- DNS解析之路

  1、浏览器缓存、系统缓存、路由器缓存、DNS缓存

  2、根域名服务器、顶级域名服务器、主域名服务器、保存结果至缓存

  递归查询、迭代查询

- DNS优化

​       1、 善用缓存TTL，善于设置时间长短

​       2、负载均衡：DNS服务器对每个查询将以DNS文件中主机记录的IP地址按顺序返回不同的解析结果，将客户端的访问引导到不同的机器上去，使得不同的客户端访问不同的服务器



1655866773

---



[参考](https://mp.weixin.qq.com/s/oJHkjjq7H8lCuI04CL7YXQ)
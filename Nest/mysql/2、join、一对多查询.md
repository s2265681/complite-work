## 关联表

## 一对一 关联

> 创建 user 表

```js
CREATE TABLE `hello-mysql`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` VARCHAR(45) NOT NULL COMMENT '名字',
  PRIMARY KEY (`id`)
);

INSERT INTO `user` (`name`)
	VALUES
		('张三'),
		('李四'),
		('王五'),
		('赵六'),
		('孙七'),
		('周八'),
		('吴九'),
		('郑十'),
		('钱十一'),
		('陈十二');
```

> 创建 id_card 表

```js
CREATE TABLE `id_card` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `card_name` varchar(45) NOT NULL COMMENT '身份证号',
  `user_id` int DEFAULT NULL COMMENT '用户 id',
  PRIMARY KEY (`id`),
  INDEX `card_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
)  CHARSET=utf8mb4

INSERT INTO id_card (card_name, user_id)
    VALUES
        ('110101199001011234',1),
	('310101199002022345',2),
	('440101199003033456',3),
	('440301199004044567',4),
	('510101199005055678',5),
	('330101199006066789',6),
	('320101199007077890',7),
	('500101199008088901',8),
	('420101199009099012',9),
	('610101199010101023',10);

```

> 关联查询 JOIN ON

```js
SELECT * FROM user JOIN id_card ON user.id = id_card.user_id;
// OR
SELECT user.id, name, id_card.id as card_id, card_name
    FROM user
    INNER JOIN id_card ON user.id = id_card.user_id;

```

LEFT JOIN 是额外返回左表中没有关联上的数据。
RIGHT JOIN 是额外返回右表中没有关联上的数据。

> 设置外链的 on update 、 on delete 级联方式

- RESTRICT 或者 NO ACTION，只有当从表没有关联的记录的时候，才能更新主表记录的 id 或者删除它。
- CASCADE 的处理逻辑：主表删除，从表关联记录也级联删除，主表 id 更新，从表关联记录也跟着更新。
- set null 的处理逻辑：主表记录删除或者修改 id，从表关联记录外键置为 null

## 2. 多对一、多对多

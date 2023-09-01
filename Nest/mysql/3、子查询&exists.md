#

## 子查询

查询学生中最高分

```js
SELECT MAX(score) FROM student;
select name, class from student where score = (select max(score) from student);
```

exists not exists

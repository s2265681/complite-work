import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items = this.cartService.getItems();

  checkoutForm = this.formBuilder.group({
    name: '',
    address: '',
  });

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) { }

  //当 Angular 设置或重新设置数据绑定的输入属性时响应。 该方法接受当前和上一属性值的 SimpleChanges 对象
  ngOnChanges(): void {
    console.log('ngOnChanges')
  }

  // 在 Angular 第一次显示数据绑定和设置指令/组件的输入属性之后，初始化指令/组件
  ngOnInit(): void {
    console.log(this.items, 'ngOnInit');
  }

  // 检测，并在发生 Angular 无法或不愿意自己检测的变化时作出反应
  ngDoCheck(): void {
    console.log('ngDoCheck')
  }

  // 当 Angular 把外部内容投影进组件视图或指令所在的视图之后调用
  ngAfterContentInit(): void {
    console.log('ngAfterContentInit')
  }

  // 每当 Angular 检查完被投影到组件或指令中的内容之后调用
  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked')
  }

  // 当 Angular 初始化完组件视图及其子视图或包含该指令的视图之后调用。
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit')
  }

  // 每当 Angular 做完组件视图和子视图或包含该指令的视图的变更检测之后调用
  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked')
  }

  // 每当 Angular 每次销毁指令/组件之前调用并清扫。 在这儿反订阅可观察对象和分离事件处理器，以防内存泄漏
  ngOnDestroy(): void {
    console.log('ngOnDestroy')
  }

  onSubmit(): void {
    // Process checkout data here
    this.items = this.cartService.clearCart();
    console.log('Your order has been submitted', this.checkoutForm.value);
    this.checkoutForm.reset();
  }
}

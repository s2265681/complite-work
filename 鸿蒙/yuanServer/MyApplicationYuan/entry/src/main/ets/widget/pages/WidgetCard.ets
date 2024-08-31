@Entry
@Component
struct WidgetCard {
  /*
   * The max lines.
   */
  readonly MAX_LINES: number = 1;

  /*
   * The action type.
   */
  readonly ACTION_TYPE: string = 'router';

  /*
   * The message.
   */
  readonly MESSAGE: string = 'add detail';

  /*
   * The ability name.
   */
  readonly ABILITY_NAME: string = 'EntryAbility';

  /*
   * The with percentage setting.
   */
  readonly FULL_WIDTH_PERCENT: string = '100%';

  /*
   * The height percentage setting.
   */
  readonly FULL_HEIGHT_PERCENT: string = '100%';

  build() {
    Stack() {
      Text("这是我的元服务卡片")
    }
    .width(this.FULL_WIDTH_PERCENT)
    .height(this.FULL_HEIGHT_PERCENT)
    .onClick(() => {
      //点击元的服务卡片 调起页面
      postCardAction(this, {
        "action": this.ACTION_TYPE,//router
        "abilityName": this.ABILITY_NAME,
        "params": {
          "message": this.MESSAGE
        }
      });
    })
  }
}
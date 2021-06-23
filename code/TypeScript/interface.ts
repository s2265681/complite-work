
interface Radio {
    switchRadio(trriger:boolean) : void | number;
}

interface Battery {
     checkBattaryStatus();
}

interface WithBattery extends Battery{
    checkBattaryStatus();
}

class Car implements Radio{
    switchRadio(){}
}



interface RadioWithBattery extends Battery{
    checkBattaryStatus();
}




// class Cellphone implements Radio,Battery{
//     switchRadio(){}
//     checkBattaryStatus(){}
// }



class Cellphone implements RadioWithBattery{
    switchRadio(){}
    checkBattaryStatus(){}
}


var price,
    crust_price,
    topping_price;
let total = 0;
let checkoutTotal = 0;
function Getpizza(name, size, crust, topping, total) {
    this.name = name;
    this.size = size;
    this.crust = crust;
    this.topping = topping;
    this.total = total;
}


$(document).ready(function () {

    $("button.proceed").click(function (event) {
        let pname = $(".name option:selected").val();
        let psize = parseInt($("#size option:selected").val());
        let pcrust = parseInt($("#crust option:selected").val());
        let ptopping = [];

        $.each($("input[name='toppings']:checked"), function () {
            ptopping.push($(this).val());
        });
        console.log(ptopping.join(", "));
        console.log("sddsd" + psize);
        console.log(psize + pcrust);


        let topping_value = ptopping.length * 50;
        console.log("toppins value" + topping_value);

        if ((psize == "0") && (pcrust == "0")) {
            console.log("nothing selected");
            $("button.proceed").show();
            $("#information").show();
            $("div.choice").hide();
            alert("Please select pizza size and crust");
        } else {
            $("button.proceed").hide();
            $("#information").hide();
            $("div.choice").slideDown(1000);
        } 
        total = psize + pcrust + topping_value;
        console.log(total);
        
        checkoutTotal = checkoutTotal + total;

        $("#pizzaname").html($(".name option:selected").val());
        $("#pizzasize").html($("#size option:selected").val());
        $("#pizzacrust").html($("#crust option:selected").val());
        $("#pizzatopping").html(ptopping.join(", "));
        $("#totals").html(total);

        // Add pizza button
        $("button.addPizza").click(function () {
            let pname = $(".name option:selected").val();
            let psize = parseInt($("#size option:selected").val());
            let pcrust = parseInt($("#crust option:selected").val());
            let ptopping = [];
            $.each($("input[name='toppings']:checked"), function () {
                ptopping.push($(this).val());
            });
            console.log(ptopping.join(", "));

            let topping_value = ptopping.length * 50;
            console.log("toppins value" + topping_value);
            total = psize + pcrust + topping_value;
            console.log(total);

            checkoutTotal = checkoutTotal + total;
            console.log(checkoutTotal);
            
            // constractor function
            var newOrder = new Getpizza(pname, psize, pcrust, ptopping, total);

            $("#ordersmade").append('<tr><td id="pizzaname">' + newOrder.name + '</td><td id="pizzasize">' + newOrder.size + '</td><td id="pizzacrust">' + newOrder.crust + '</td><td id="pizzatopping">' + newOrder.topping + '</td><td id="totals">' + newOrder.total + '</td></tr>');
            console.log(newOrder);


        });
        // Checkout button
        $("button#checkout").click(function () {
            $("button#checkout").hide();
            $("button.addPizza").hide();
            $("button.deliver").slideDown(1000);
            $("#addedprice").slideDown(1000);
            console.log("Your total bills is sh. " + checkoutTotal);
            $("#pizzatotal").append("Your bill is sh. " + checkoutTotal);
        });

        // home delivery button
        $("button.deliver").click(function () {
            $(".pizzatable").hide();
            $(".choice h2").hide();
            $(".delivery").slideDown(1000);
            $("#addedprice").hide();
            $("button.deliver").hide();
            $("#pizzatotal").hide();
            let deliveryamount = checkoutTotal + 200;
            console.log("You will pay ksh. " + deliveryamount + " on delivery");
            $("#totalbill").append("Your bill plus delivery fee is: " + deliveryamount);
        });


        $("button#final-order").click(function (event) {
            event.preventDefault();

            $("#pizzatotal").hide();
            $(".delivery").hide();
            $("button#final-order").hide();
            
            let deliveryamount = checkoutTotal + 200;
            console.log("Final Bill is: " + deliveryamount);
            
            let person = $("input#name").val();
            let phone = $("input#phone").val();
            let location = $("input#location").val();

            if ($("input#name").val() && $("input#phone").val() && $("input#location").val() != " ") {

                $("#finallmessage").append(person + ", We have recieved your order and it will be delivered to you at " + location + ". Prepare ksh. " + deliveryamount);
                $("#totalbill").hide();
                $("#finallmessage").slideDown(1200);
            } else {
                alert("Please fill in the details for delivery!");
                $(".delivery").show();
                $("button#final-order").show();
            }
        });
        event.preventDefault();
    });
});

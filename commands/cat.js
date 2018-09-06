const Discord = require('discord.js')

module.exports.run = async(bot, message, args) => {


    var subreddits = [

        'https://images.unsplash.com/photo-1515467410840-96a3cf21dbea?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=e1ef3210d248a239cbc4af8aca7d5daf',
        'https://images.unsplash.com/photo-1521294102048-6cb73602dc43?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=63fd7fff4d11b9a9b67d8293385612d9',
        'https://images.unsplash.com/photo-1514536338919-cd001f6dc6b3?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=e1627ba92c4da0fe62adbc09c1cf748d',
        'https://images.unsplash.com/photo-1528279027-68f0d7fce9f1?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=1eafbf9cf6d7edfbea47de1728c1cfc0',
        'https://images.unsplash.com/photo-1525164286253-04e68b9d94c6?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=5c4efce8d5c5bcc8525f780abe9fd80f',
        'https://images.unsplash.com/photo-1464306076886-da185f6a9d05?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=56981f43b9e1d839c6e4bd7e04676fbe',
        'https://images.unsplash.com/photo-1485474187873-a541e1da7c51?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=ee1147a1ade332e49933190e827ea674',
        'https://images.unsplash.com/photo-1529942458412-eda69f76291d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=15aee80b9bb95f64a381ad60a12b5fe2',
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=adcd959f5eba0d3cdcd37c0ec7533b23',
        'https://images.unsplash.com/photo-1468577760773-139c2f1c335f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=f767bbecf992cbb689a3d6549ed376c8',
        'https://images.unsplash.com/photo-1465014925804-7b9ede58d0d7?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=f12a2aa55cd96a52637fd0d2cbf04e03',
        'https://images.unsplash.com/photo-1519984388953-d2406bc725e1?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=c5ab2e5c624ea99ecc8f5bef6ce05d85',
        'https://images.unsplash.com/photo-1511969193364-49214445cf91?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=82f6245d5ce4508a23ec317f44a066de',
        'https://images.unsplash.com/photo-1515467529252-d8f02a46e731?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=b5bef77fed2007735e835e7ddcfec4ba',
        'https://images.unsplash.com/photo-1455731657401-43502b7c1ab9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=ba1342d9662ffe4a10d17d84bff7ef62',
        'https://images.unsplash.com/photo-1494957755956-65fe8c408bb5?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=f822ed95adfc4778392a3ebbe4e581a2',
        'https://images.unsplash.com/photo-1442604699113-7d805614c476?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9&s=3da74548235a0b08c401215b1e994c63',
        'https://lezzet.blob.core.windows.net/images-xxlarge-recipe/ispanakli_manti-0f249945-3ef8-470f-b33a-a6b075c1a7d9.jpg',
        'https://images.rapgenius.com/ce46193adc445413cb49e35c0cefbb90.1000x669x1.jpg',
        'https://www.tigerfitness.com/media/wysiwyg/chips-dip.jpg',
        'https://photo.foodgawker.com/wp-content/uploads/2018/08/3292395.jpg',
        'https://pixel.nymag.com/imgs/daily/grub/2015/01/26/26-cacio-e-pepe.w710.h473.2x.jpg',
        'http://www.psikologankara.net/wp-content/uploads/2016/02/food-porn-1.jpg',
        'https://static.tumblr.com/5d3361a5e61e550aed09165611bb18e0/obhhazq/t8Xn7zgxf/tumblr_static_tumblr_static_dxl9z1feu3w4ssw00gckk0cco_640.jpg',
        'https://i0.wp.com/loveantalya.com/wp-content/uploads/2018/03/adana-kebab-1.jpg',
        'http://rivista-cdn.hourdetroit.com/Hour-Detroit/August-2015/Food-Porn-Illness/waffle_cx.jpg?ver=1437411554',
        'https://i.ytimg.com/vi/-_FpFNec9w4/hqdefault.jpg',
        'https://images-gmi-pmc.edge-generalmills.com/c41ffe09-8520-4d29-9b4d-c1d63da3fae6.jpg'






        ]
        var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];




                const embed = new Discord.RichEmbed()
                    .setColor(0xff0000)
                    .setImage(sub);
                message.channel.send({
                    embed
                });

}

module.exports.help = {
    name: "foodporn"
}

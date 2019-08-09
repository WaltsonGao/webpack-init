<template>
    <div>
        {{msg}}
        <div>
            <select v-model="selItem" multiple>
                <option
                        v-for="item in items"
                        :value="item.value"
                        :key="item.text">{{item.text}}</option>
            </select>
            <p @click="handleClick">{{selItem}}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App',
    data() {
        return {
            msg: 'Hello Man',
            selItem: [],
            items: [
                {
                    value: 'aaa',
                    text: '哈哈哈'
                },
                {
                    value: 'bbb',
                    text: '哇哇哇'
                },
                {
                    value: '',
                    text: '啧啧啧'
                },
                {
                    value: 'ddd',
                    text: '嘀嘀嘀'
                }
            ]
        };
    },
    methods: {
        handleClickP() {
            console.log(1111);
        },
        handleClick() {
            const a = 'aaa';
            console.log(a);
        }
    }
};
</script>

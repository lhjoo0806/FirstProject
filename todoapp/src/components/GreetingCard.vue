<template>
    <div>
        <h1>Hello, {{ name }}</h1>
        <p>{{ message }}</p>
        <p>{{ age }} years old.</p>
    </div>
</template>

<script>
export default  {
    props: {
        name: String,
        message: String,
        age: {
            type: Number,
            default: 15
        }
    }
};
</script>

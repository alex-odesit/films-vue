<template>
   <div class="item">
		<i class="loader --1"></i>
	</div>
</template>

<script>
export default {
   
}
</script>

<style scoped lang="scss">
.loader {
	--color: rgb(0, 0, 0);
	--size-mid: 20px;
	--size-dot: 20px;
	--size-bar: 20px;
	--size-square: 20px;
	
	display: block;
	position: relative;
	width: 50%;
	display: grid;
	place-items: center;
}

.loader::before,
.loader::after {
	content: '';
	box-sizing: border-box;
	position: absolute;
}

.loader.--1::before {
	width: var(--size-mid);
	height: var(--size-mid);
	border: 4px solid var(--color);
	border-top-color: transparent;
	border-radius: 50%;
	animation: loader-1 1s linear infinite;
}

.loader.--1::after {
	width: calc(var(--size-mid) - 2px);
	height: calc(var(--size-mid) - 2px);
	border: 2px solid transparent;
	border-top-color: var(--color);
	border-radius: 50%;
	animation: loader-1 0.6s linear reverse infinite;
}

@keyframes loader-1 {
	100% {
		transform: rotate(1turn);
	}
}
</style>
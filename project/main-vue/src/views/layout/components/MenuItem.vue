<template>
	<div>
		<template v-for="item in data">
			<template v-if="item.children && item.children.length">
				<el-sub-menu :key="item.name" :index="item.path" class="side-submenu" popper-class="submenu-class">
					<template slot="title">
						<i :class="item.meta.icon"></i>
						<span slot="title">{{ item.meta.title }}</span>
					</template>
					<menu-item :data="item.children" />
				</el-sub-menu>
			</template>
			<el-menu-item v-else :key="item.name" :index="item.path">
				<i :class="item.meta?.icon"></i>
				<span slot="title">{{ item.meta?.title }}</span>
			</el-menu-item>
		</template>
	</div>
</template>

<script>
export default {
	name: "MenuItem",
	props: {
		data: {
			type: Array,
			default: () => []
		}
	}
};
</script>
<style lang="scss">
.submenu-class {
	.el-menu--popup {
		min-width: 160px;
		.el-submenu__icon-arrow {
			margin-top: -4px;
		}
	}
}
.side-submenu {
	.side-submenu {
		&.is-active {
			.el-submenu__title {
				i,
				span {
					color: #ffd04b !important;
				}
			}
		}
	}
}
</style>

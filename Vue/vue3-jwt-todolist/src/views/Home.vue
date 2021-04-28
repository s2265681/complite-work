<template>
  <div>
    <div class="nav-bar">
      <span class="username">{{ userInfo.username }}</span>
      <a-divider type="vertical" />
      <a-button type="primary" @click="logout"> 登出 </a-button>
    </div>
    <Todolist />
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Todolist from '../components/Todolist.vue';
import { userinfoAPI } from '../api/user';
function getUserinfo() {
  return userinfoAPI();
}
export default {
  name: 'Home',
  components: {
    Todolist,
  },
  setup(props) {
    const userInfo = ref('');
    const router = useRouter();
    onMounted(async () => {
      let res = await getUserinfo();
      if (res.error == 0 && res.data) {
        userInfo.value = { ...res.data };
      }
    });
    const logout = async function () {
      localStorage.removeItem('token');
      router.replace('/login');
    };
    return {
      userInfo,
      logout,
    };
  },
};
</script>
<style scoped>
.nav-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
}
.username {
  font-size: 18px;
}
</style>

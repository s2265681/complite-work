import api from '../../api';
// getSongDetail

export default {
    state: {
        loading: false,
        songDetail: {},
        simList: [],
        simSongList: [],
        songUrl: '',
        songLyric: []
    },
    mutations: { // 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation, 只能同步
        getMusicDetailM(state, params) {
            state.songDetail = params;
        },
        getSimListM(state, params) {
            state.simList = params;
        },
        getSimSongListM(state, params) {
            state.simSongList = params;

        },
        getSongUrlM(state, params) {
            state.songUrl = params;
        },
        getSongLyricM(state, params) {
            state.songLyric = params;
        }
    },
    actions: {
        //获取歌曲详情
        getMusicDetailA({ commit }, params) {
            api.getSongDetail(params).then((res: any) => {
                if (res.code === 200) {
                    commit('getMusicDetailM', res.songs[0].al)
                }
            })
        },
        //获取相似歌单
        getSimListA({ commit }, params) {
            api.simiPlaylist(params).then((res: any) => {
                if (res.code === 200) {
                    console.log(222, res)
                    commit('getSimListM', res.playlists)
                }
            })
        },
        //获取相似歌曲
        getSimSongListA({ commit }, params) {
            api.simiSong(params).then((res: any) => {
                if (res.code === 200) {
                    console.log(111, res)
                    commit('getSimSongListM', res.songs)
                }
            })
        },
        // 获取歌曲url
        getSongUrlA({ commit }, params) {
            api.getSongUrl(params).then((res: any) => {
                if (res.code === 200) {
                    console.log('url', res)
                    commit('getSongUrlM', res.data[0].url)
                }
            })
        },
        // 获取歌曲歌词
        getSongLyricA({ commit,dispatch }, params) {
            api.getSongLyric(params).then((res: any) => {
                if (res.code === 200) {
                    dispatch('formatSongLyric',res.lrc.lyric)
                }
            })
        },
    // 处理歌词
        formatSongLyric({ commit }, params) {
            const lyricArr = [];
            params.split("\n").forEach((item) => {
              if (item !== "") {
                item.replace(/\[(\d+):(\d+\.\d+)\](.+)/g, (_, $1, $2, $3) => {
                  const time = parseFloat($1) * 60 + parseFloat($2);
                  lyricArr.push({
                    timeNum: time,
                    lyric: $3,
                  });
                });
              }
            });
            commit('getSongLyricM',lyricArr);
          },
    }
}

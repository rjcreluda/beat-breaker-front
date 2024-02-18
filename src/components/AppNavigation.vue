<template>
    <v-navigation-drawer app v-model="drawer" class="brown lighten-2" dark disable-resize-watcher>
        <v-list>
            <template v-for="(item, index) in items" :key="index">
                <v-list-tile>
                    <v-list-tile-content>
                        {{item.title}}
                    </v-list-tile-content>
                </v-list-tile>
                <v-divider></v-divider>
            </template>
        </v-list>
    </v-navigation-drawer>
    <v-toolbar app color="transparent" style="z-index: 3;" dark absolute  class="text-white">
      <v-toolbar-side-icon class="hidden-md-and-up" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="text-white">Beat Breaker</v-toolbar-title>
      
      <v-spacer></v-spacer>
      <v-btn flat>Home</v-btn>
      <v-btn flat>Demo</v-btn>
    </v-toolbar>
</template>

<script>
export default {
  name: 'AppNavigation',
  data: () => ({
    drawer: false,
    items: [
        { title: 'Menu' },
        { title: 'Sign In' },
        { title: 'Join' }
    ]
  })
}
</script>
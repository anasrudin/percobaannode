<template>
  <div>

    <HomeNav />
    <HomeImage />
    <Article />


    <!-- <div id="button">
        <button @click="showMessageFromBackend">Show message from backend</button>
    </div> -->

    
  <!-- <div id="app">
      <p>test</p>

    <div v-if="error">
      {{ error }}
    </div>
    <ul v-else>
      <li v-for="article in articles" :key="article.id">
        {{ article.article.title}}
      </li>
    </ul>
  </div> -->


<center>
  <p v-if="$fetchState.pending">Fetching mountains...</p>
  <p v-else-if="$fetchState.error">An error occured :(</p>
  <div v-else>
    
    <ul>
      <li v-for="mountain of mountains">{{ mountain.description}}</li>

    </ul>
    <button @click="$fetch">Refresh</button>
  </div>

    <p>askjdaj asdasdasds</p>
</center>

    
    <Footer />
  </div>
</template>

<script>


  export default {
    data() {
      return {
        mountains: [],
        headers: {'Content-Type': 'application/json'}
      }
    },
    async fetch() {
      this.mountains = await fetch(
        // 'http://localhost:3001/articles'
        'https://api.nuxtjs.dev/posts'
      ).then(res => res.json())
    }
  }





//   export default {
//     data() {
//       return {
//         todos: []
//         // headers: {'Content-Type': 'application/json'}
//       }
//     },
//     async fetch() {
//     const { data } = await axios.get(
//       `https://jsonplaceholder.typicode.com/todos`
//     )
//     // `todos` has to be declared in data()
//     this.todos = data
//     }
//   }













// export default {
//   name: 'App',
//   data () {
//     return {
//       articles: [],
//       error: null,
//       headers: {'Content-Type': 'application/json'}
//     }
//   },
//   methods: {
//     parseJSON: function (resp) {
//       return (resp.json ? resp.json() : resp);
//     },
//     checkStatus: function (resp) {
//       if (resp.status >= 200 && resp.status < 300) {
//         return resp;
//       }
//       return this.parseJSON(resp).then((resp) => {
//         throw resp;
//       });
//     }
//   },
//   async mounted () {
//     try {
//       const response = await fetch("http://localhost:3001/articles", {
//         method: 'GET',
//         headers: this.headers,
//       }).then(this.checkStatus)
//         .then(this.parseJSON);
//         this.articles = response
//     } catch (error) {
//       this.error = error
//     }
//   }
// }


// export default {
//   name: 'App',
//   data () {
//     return {
//       articles: [],
//       error: null,
//       headers: {'Content-Type': 'application/json'}
//     }
//   },
//    async mounted () {
//     fetch('http://localhost:3001/articles', {
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     })
//     .then(response => response.json())
//     .then(data => console.log(data));
//    }
// }

// export default {
//     name: 'button',
//   methods: {
//     async showMessageFromBackend () {

//       try {
//         const response = await this.$axios.get('/api/test')
//         console.log(response.data)
//       } catch (err) {
//         console.log(err)
//       }

//     }
//   }
// }


</script>


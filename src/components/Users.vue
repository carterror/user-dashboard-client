<template>
  <section id="tables">
    <mdb-row>
      <mdb-col md="12">
        <mdb-card cascade narrow class="mt-5">
          <mdb-view class="gradient-card-header blue darken-2">
            <h4 class="h4-responsive text-white">Lista de Usuarios</h4>
          </mdb-view>
            <mdb-view class="gradient-card-header text-right">
            <mdb-btn-group>
              <mdb-input
              v-model="search"
              inputGroup
              :formOutline="false"
              wrapperClass="mb-3"
              placeholder="Buscar por rol"
              aria-label="Search"
              aria-describedby="button-addon2"
              class="form-icon-trailing"
              >
              <mdb-icon color="blue" icon="search" class="trailing" style="position: absolute; top: 15px; right: 10px;"></mdb-icon>
              </mdb-input>
            </mdb-btn-group>
            </mdb-view>
            <mdb-card-body>
            <mdb-tbl>
              <thead class="blue-grey lighten-4">
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="user in paginatedUsers" :key="user.id">
                <th scope="row">{{ user.id }}</th>
                <td>{{user.name}}</td>
                <td>{{user.email}}</td>
                <td style="width: 150px;"><h5><mdb-badge :color="user.role == 'manager' ? 'primary' : user.role == 'comprador' ? 'success' : 'warning'" class="text-uppercase d-block p-2 text-center">{{ user.role }}</mdb-badge></h5></td>
              </tr>
              </tbody>
            </mdb-tbl>
            <mdb-pagination>
              <mdb-pagination-item v-if="currentPage > 1">
              <mdb-pagination-link >
                <mdb-btn @click="handlePageChange(currentPage - 1)">Anterior</mdb-btn>
              </mdb-pagination-link>
              </mdb-pagination-item>

              <mdb-pagination-item v-for="page in totalPages" :key="page" >
              <mdb-pagination-link v-if="(page - currentPage) <= 5">
                <mdb-btn class="px-2" :active="page === currentPage" @click="handlePageChange(page)">{{ page }}</mdb-btn>
              </mdb-pagination-link>
              </mdb-pagination-item>

              <mdb-pagination-item v-if="currentPage < totalPages">
              <mdb-pagination-link>
                <mdb-btn @click="handlePageChange(currentPage + 1)">Siguiente</mdb-btn>
              </mdb-pagination-link>
              </mdb-pagination-item>
            </mdb-pagination>
            </mdb-card-body>
        </mdb-card>
      </mdb-col>
    </mdb-row>
  </section>
</template>

<script>
import { mdbRow, mdbCol, mdbCard, mdbView, mdbCardBody, mdbTbl, mdbBadge, mdbInput, mdbBtn, mdbIcon, mdbBtnGroup, mdbPagination, mdbPaginationItem, mdbPaginationLink } from 'mdbvue'
import { getUsers } from '../apis/users';
export default {
  name: 'Users',
  components: {
    mdbRow,
    mdbCol,
    mdbCard,
    mdbView,
    mdbCardBody,
    mdbTbl,
    mdbBadge,
    mdbInput,
    mdbBtn,
    mdbIcon,
    mdbBtnGroup,
    mdbPagination, 
    mdbPaginationItem, 
    mdbPaginationLink
  },
  data () {
    return {
      users: [],
      loading: false,
      filterRole: null,
      search: null,
      currentPage: 1,
      itemsPerPage: 10
    }
  },
  computed: {
    usersFilters () {
      return this.users.filter(x => (!this.search || x.role.indexOf(this.search.toLowerCase()) != -1))
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.usersFilters.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.usersFilters.length / this.itemsPerPage);
    }
  },
  methods: {
    async loadUsers() {
      this.users =  await getUsers()
    },
    handlePageChange(page) {
      this.currentPage = page;
    }
  },
  async mounted() {
    await this.loadUsers()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card.card-cascade .view.gradient-card-header {
  padding: 1rem 1rem;
  text-align: center;
}
.card.card-cascade h3,
.card.card-cascade h4 {
  margin-bottom: 0;
}
</style>

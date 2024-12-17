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
              <mdb-input v-model="search" inputGroup :formOutline="false" wrapperClass="mb-3"
                placeholder="Buscar por rol" aria-label="Search" aria-describedby="button-addon2"
                class="form-icon-trailing">
                <mdb-icon color="blue" icon="search" class="trailing"
                  style="position: absolute; top: 15px; right: 10px;"></mdb-icon>
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
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td style="width: 150px;">
                    <h5>
                      <mdb-badge
                        :color="user.role == 'manager' ? 'primary' : user.role == 'comprador' ? 'success' : 'warning'"
                        class="text-uppercase d-block p-2 text-center">
                        {{ user.role }}
                      </mdb-badge>
                    </h5>
                  </td>
                </tr>
              </tbody>
            </mdb-tbl>
            <mdb-pagination>
              <div >
                <span>
                  <mdb-btn class="px-2" style="width: 40px; background-color: #0D47A1 !important;"
                    @click="handlePageChange(currentPage - 1)" :disabled="currentPage < 2"> {{ pre }} </mdb-btn>
                </span>
                <span>
                  <mdb-btn v-if="currentPage > 1" style="width: 40px; background-color: #0D47A1 !important;" class="px-2"
                    @click="handlePageChange(1)">1</mdb-btn>
                </span>
              </div>



              <mdb-btn style="width: 40px; background-color: #1976d2 !important;" class="px-2">{{ currentPage }}</mdb-btn>

              <div >
                <span v-if="currentPage < totalPages">
                  <mdb-btn style="width: 40px; background-color: #0D47A1 !important;" class="px-2"
                    @click="handlePageChange(totalPages)">{{ totalPages }}</mdb-btn>
                </span>
                <span>
                  <mdb-btn class="px-2" style="min-width: 40px; background-color: #0D47A1 !important;"
                    @click="handlePageChange(currentPage + 1)" :disabled="currentPage >= totalPages">{{ next }}</mdb-btn>
                </span>
              </div>

            </mdb-pagination>
          </mdb-card-body>
        </mdb-card>
      </mdb-col>
    </mdb-row>
  </section>
</template>

<script>
import { mdbRow, mdbCol, mdbCard, mdbView, mdbCardBody, mdbTbl, mdbBadge, mdbInput, mdbBtn, mdbIcon, mdbBtnGroup, mdbPagination } from 'mdbvue'
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
  },
  data() {
    return {
      users: [],
      loading: false,
      filterRole: null,
      search: null,
      currentPage: 1,
      itemsPerPage: 10,
      pre: '<',
      next: '>'
    }
  },
  computed: {
    usersFilters() {
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
      this.users = await getUsers()
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

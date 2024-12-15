<template>
  <section id="tables">
    <mdb-row>
      <mdb-col md="12">
        <mdb-card cascade narrow class="mt-5">
          <mdb-view class="gradient-card-header blue darken-2">
            <h4 class="h4-responsive text-white">Lista de Usuarios</h4>
          </mdb-view>
          <mdb-view class="gradient-card-header">
            <mdb-btn-group>
              <mdb-radio :btnCheck="false" :wrap="false" labelClass="btn btn-secondary" label="Checked" name="options" value="option1"
                v-model="filterRole" />
              <mdb-radio :btnCheck="true" :wrap="false" labelClass="btn btn-secondary" label="Radio" name="options" value="option2"
                v-model="filterRole" />
              <mdb-radio :btnCheck="false" :wrap="true" labelClass="btn btn-secondary" label="Radio" name="options" value="option3"
                v-model="filterRole" />
              <mdb-radio :btnCheck="true" :wrap="true" labelClass="btn btn-secondary" label="Radio" name="options" value="option3"
                v-model="filterRole" />
            </mdb-btn-group>
            <mdb-input
              v-model="search"
              inputGroup
              :formOutline="false"
              wrapperClass="mb-3"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="button-addon2"
            >
              <mdb-btn color="primary">
                <mdb-icon icon="search" />
              </mdb-btn>
            </mdb-input>
          </mdb-view>
          <mdb-card-body>
            <mdb-tbl>
              <thead class="blue-grey lighten-4">
                <tr><th>#</th><th>Nombre</th><th>Correo</th><th>Rol</th></tr>
              </thead>
              <tbody>
                <tr v-for="user in usersFilters" :key="user.id">
                  <th scope="row">{{ user.id }}</th>
                  <td>{{user.name}}</td>
                  <td>{{user.email}}</td>
                  <td style="width: 150px;"><h5><mdb-badge :color="user.role == 'manager' ? 'primary' : user.role == 'comprador' ? 'success' : 'warning'" class="text-uppercase d-block p-2 text-center">{{ user.role }}</mdb-badge></h5></td>
                </tr>
              </tbody>
            </mdb-tbl>
          </mdb-card-body>
        </mdb-card>
      </mdb-col>
    </mdb-row>
  </section>
</template>

<script>
import { mdbRow, mdbCol, mdbCard, mdbView, mdbCardBody, mdbTbl, mdbBadge, mdbInput, mdbBtn, mdbIcon, mdbBtnGroup, MdbRadio } from 'mdbvue'
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
    MdbRadio
  },
  data () {
    return {
      users: [],
      loading: false,
      filterRole: null,
      search: null
    }
  },
  computed: {
    usersFilters () {
      return this.users.filter(x => (x.role == this.filterRole || !this.filterRole ) && (x.name.indexOf(this.search) != -1 || x.email.indexOf(this.search) != -1 || !this.search))
    }
  },
  methods: {
    async loadUsers() {
      this.users =  await getUsers()
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

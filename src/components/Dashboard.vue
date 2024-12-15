<template>
  <section id="dashboard">
    <mdb-card class="mb-4">
      <mdb-card-body class="d-sm-flex justify-content-between">
        <h4 class="mb-sm-0 pt-2">
        <span>Dashboard Usuarios</span>
        </h4>
      </mdb-card-body>
    </mdb-card>
    <section class="mt-lg-5">
      <mdb-row>
        <mdb-col xl="3" md="6" class="mb-r">
          <mdb-card cascade class="cascading-admin-card">
            <div class="admin-up">
              <mdb-icon icon="user" far class="danger-color"/>
              <div class="data">
                <p>TOTAL</p>
                <h4>
                  <strong>{{ stats.total }}</strong>
                </h4>
              </div>
            </div>
            <mdb-card-body>
              <div class="progress">
                <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="100" class="progress-bar bg-danger" role="progressbar"
                  style="width: 100%"></div>
              </div>
              <mdb-card-text>Todos los usuarios</mdb-card-text>
            </mdb-card-body>
          </mdb-card>
        </mdb-col>
        <mdb-col xl="3" md="6" class="mb-r">
          <mdb-card cascade class="cascading-admin-card">
            <div class="admin-up">
              <mdb-icon icon="chart-line" class="light-blue lighten-1"/>
              <div class="data">
                <p>MANAGER</p>
                <h4>
                  <strong>{{ stats.manager }}</strong>
                </h4>
              </div>
            </div>
            <mdb-card-body>
              <div class="progress">
                <div aria-valuemax="100" aria-valuemin="0" :aria-valuenow="(stats.manager*100)/stats.total" class="progress-bar bg blue darken-2" role="progressbar"
                  :style="`width: ${(stats.manager*100)/stats.total}%`"></div>
              </div>
              <mdb-card-text>Porciento por role ({{ (stats.manager*100)/stats.total }}%)</mdb-card-text>
            </mdb-card-body>
          </mdb-card>
        </mdb-col>
        <mdb-col xl="3" md="6" class="mb-r">
          <mdb-card cascade class="cascading-admin-card">
            <div class="admin-up">
              <mdb-icon icon="chart-pie" class="success-color"/>
              <div class="data">
                <p>COMPRADOR</p>
                <h4>
                  <strong>{{ stats.comprador }}</strong>
                </h4>
              </div>
            </div>
            <mdb-card-body>
              <div class="progress">
                <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="75" class="progress-bar green" role="progressbar"
                :style="`width: ${(stats.comprador*100)/stats.total}%`"></div>
              </div>
              <mdb-card-text>Porciento por role ({{ (stats.comprador*100)/stats.total }}%)</mdb-card-text>
            </mdb-card-body>
          </mdb-card>
        </mdb-col>
        <mdb-col xl="3" md="6" class="mb-r">
          <mdb-card cascade class="cascading-admin-card">
            <div class="admin-up">
              <mdb-icon icon="chart-bar" class="warning-color accent-2"/>
              <div class="data">
                <p>REVISOR</p>
                <h4>
                  <strong>{{ stats.revisor }}</strong>
                </h4>
              </div>
            </div>
            <mdb-card-body>
              <div class="progress">
                <div aria-valuemax="100" aria-valuemin="0" aria-valuenow="10" class="progress-bar bg-warning" role="progressbar"
                :style="`width: ${(stats.revisor*100)/stats.total}%`"></div>
              </div>
              <mdb-card-text>Porciento por role ({{ (stats.revisor*100)/stats.total }}%)</mdb-card-text>
            </mdb-card-body>
          </mdb-card>
        </mdb-col>
      </mdb-row>
    </section>
    <section>
      <mdb-row class="mt-5">
          <mdb-col md="12" class="mb-4">
              <mdb-card>
                  <mdb-card-body>
                      <div style="display: block">
                        <mdb-bar-chart :data="barChartData" :options="barChartOptions" :height="500"/>
                      </div>
                  </mdb-card-body>
              </mdb-card>
          </mdb-col>
      </mdb-row>
    </section>
  </section>
</template>

<script>
import { mdbRow, mdbCol, mdbCard, mdbCardBody, mdbCardText, mdbIcon,mdbBarChart} from 'mdbvue'
import { getStats } from '../apis/users';

export default {
  name: 'Dashboard',
  components: {
    mdbRow,
    mdbCol,
    mdbCard,
    mdbCardBody,
    mdbCardText,
    mdbIcon,
    mdbBarChart,
  },
  data () {
    return {
      stats: {
        total: 0,
        manager: 0,
        comprador: 0,
        revisor: 0
      },
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            barPercentage: 1,
            gridLines: {
              display: true,
              color: 'rgba(0, 0, 0, 0.1)'
            }
          }],
          yAxes: [{
            gridLines: {
              display: true,
              color: 'rgba(0, 0, 0, 0.1)'
            },
            ticks: {
              beginAtZero: true
            }
          }]
        }
      },
    }
  },
  computed: {
    barChartData() {
      return  {
        labels: ['Manager', 'Comprador', 'Revisor'],
        datasets: [
          {
            label: 'Usuarios por rol',
            data: [this.stats.manager,  this.stats.comprador, this.stats.revisor],
            backgroundColor: ['rgba(90, 173, 246, 0.5)', 'rgba(74, 245, 85, 0.5)', 'rgba(245, 192, 50, 0.5)'],
            borderWidth: 1
          }, 
        ]
      }
    }
  },
  methods: {
    async loadUsersStats() {
      const response =  await getStats()
      this.stats.total = response[0].count + response[1].count + response[2].count 
      this.stats.manager = response.filter(x => x.role == 'manager')[0].count
      this.stats.comprador = response.filter(x => x.role == 'comprador')[0].count
      this.stats.revisor = response.filter(x => x.role == 'revisor')[0].count
    } 
  },
  async mounted() {
    await this.loadUsersStats()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cascading-admin-card {
  margin: 20px 0;
}
.cascading-admin-card .admin-up {
  margin-left: 4%;
  margin-right: 4%;
  margin-top: -20px;
}
.cascading-admin-card .admin-up .fas,
.cascading-admin-card .admin-up .far {
  box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.2), 0 2px 13px 0 rgba(0, 0, 0, 0.19);
  padding: 1.7rem;
  font-size: 2rem;
  color: #fff;
  text-align: left;
  margin-right: 1rem;
  border-radius: 3px;
}
.cascading-admin-card .admin-up .data {
  float: right;
  margin-top: 2rem;
  text-align: right;
}
.admin-up .data p {
  color: #999999;
  font-size: 12px;
}
.classic-admin-card .card-body {
  color: #fff;
  margin-bottom: 0;
  padding: 0.9rem;
}
.classic-admin-card .card-body p {
  font-size: 13px;
  opacity: 0.7;
  margin-bottom: 0;
}
.classic-admin-card .card-body h4 {
  margin-top: 10px;
}
</style>

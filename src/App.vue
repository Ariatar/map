<template>
   <v-app>
      <v-container>
         <h1 class="upper-title">Contacts</h1>
         <v-layout class="mb-12">
            <v-flex class="Contacts">
               <div class="title">
                  <span>GMS</span>
                  <h2>Headquarters</h2>
               </div>

               <div class="d-flex">
                  <div class="adress">
                     <ul>
                        <li>Global Message Services Ukraine LLC</li>
                        <li>Bundersstrasse 5 | 3dFloor</li>
                        <li>6300 Zug</li>
                        <li>Switzerland</li>
                        <li>
                           <div class="number">
                              <a :href="{ tel: phone }">{{ phone }}</a>
                           </div>
                        </li>
                     </ul>
                  </div>
                  <div class="contact">
                     <ul>
                        <li>Email</li>
                        <li>
                           <div>info@gms-worldwide.com</div>
                        </li>
                        <li>Send message</li>
                        <li>viber us</li>
                        <li>Send form</li>
                        <li>
                           <div class="contact-number">contact us</div>
                        </li>
                     </ul>
                  </div>
               </div>
            </v-flex>

            <v-flex class="Contacts">
               <div class="title">
                  <h2 class="ma-0">Technical support</h2>
                  <span class="innner-support">24/7</span>
               </div>
               <div class="Contacts-desc">
                  <p>
                     GMS understands that it can be hard to follow all new
                     technologies. We regularly provide for all our clients
                     educational trainings to make your operator's business
                     learn more and better though our best practices.
                  </p>
                  <div class="number">
                     <a :href="{ tel: phone }">{{ phone }}</a>
                  </div>
               </div></v-flex
            >
         </v-layout>
         <v-layout class="content-page">
            <v-flex
               ><h1>Our Offices</h1>
               <div class="content-page-country">
                  <ul>
                     <li
                        v-for="(country, i) in countries"
                        :key="i"
                        @click="clickable"
                        id="country"
                     >
                        {{ country.name }}
                     </li>
                  </ul>
               </div>

               <div class="content-page-adress">
                  <h2>Global Message Services Ukraine LLC</h2>
                  <ul>
                     <li>Kyiv,Stepan Bandera 33</li>
                     <li>02066</li>
                     <li>Ukraine</li>
                  </ul>
               </div>
            </v-flex>
            <v-img :src="map">
               <div>
                  <div
                     class="red selectable"
                     style="height: 30px; width: 30px; border-radius: 50%; position: absolute; top: 40%; left: 50%"
                  ></div>
               </div>
            </v-img>
         </v-layout>
         <v-layout class="footer-page">
            <v-flex md6>
               <h1>Contact us</h1>
               <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                     class="mt-12"
                     v-model="name"
                     :counter="30"
                     :rules="nameRules"
                     label="Name"
                     required
                  ></v-text-field>

                  <v-text-field
                     class="phone"
                     v-model="phoned"
                     :counter="10"
                     label="Phone"
                     required
                     type="number"
                     placeholder="+380__"
                  ></v-text-field>

                  <v-text-field
                     v-model="email"
                     :rules="emailRules"
                     label="E-mail"
                     required
                  ></v-text-field>

                  <v-checkbox
                     class="typ-label"
                     v-model="checkbox"
                     :rules="[(v) => !!v || 'You must agree to continue!']"
                     label="I agree the processing of personal data"
                     required
                  ></v-checkbox>

                  <v-btn :disabled="!valid" class="mr-4" @click="validate">
                     'Get in Touch'
                     <v-progress-circular
                        v-if="loading"
                        indeterminate
                        color="red"
                     ></v-progress-circular>
                  </v-btn>
               </v-form>
            </v-flex>
            <v-flex class="align-center d-flex" md6
               ><div class="d-flex  ">
                  <div>
                     <p class="pa-12 footer-desc">
                        Please tell us more about your request and give us info
                        about your company and country
                     </p>
                  </div>
               </div></v-flex
            >
         </v-layout>
      </v-container>
   </v-app>
</template>

<script>
import axios from "axios";
export default {
   name: "App",
   data() {
      return {
         countries: [
            {
               name: "kyiv",
               selectedCountry: true,
            },
            {
               name: "new york",
               selectedCountry: true,
            },
            {
               name: "guangzou",
               selectedCountry: true,
            },
            {
               name: "barselona",
               selectedCountry: true,
            },
         ],
         selectCountry: true,
         loading: false,
         map: require("./assets/Screenshot_1.png"),
         phoned: "",
         phone: "+41 41 544 62 00",
         valid: true,
         name: "",
         nameRules: [
            (v) => !!v || "Name is required",
            (v) => /[^\d]/gi.test(v) || "name consist of letter and scape",
            (v) =>
               (v && v.length <= 30) || "Name must be less than 30 characters",
         ],
         email: "",
         emailRules: [
            (v) => !!v || "E-mail is required",
            (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
         ],

         checkbox: false,
      };
   },
   methods: {
      clickable() {
         var kyiv = (document.querySelector("#country").style.color = "green");

         var selectable = (document.querySelector(".selectable").style.display =
            "block");
      },
      validate() {
         if (this.$refs.form.validate()) {
            try {
               this.loading = false;
               axios
                  .post("http://httpbin.org/post", {
                     email: this.email,
                     name: this.name,
                     phoned: this.phones,
                     valid: true,
                  })
                  .then((res) => {
                     console.log(res.data);
                     this.loading = false;
                  });
               this.loading = true;
            } catch (error) {
               this.loading = false;
               console.log(error);
            }
         }
      },
      reset() {
         this.$refs.form.reset();
      },
      resetValidation() {
         this.$refs.form.resetValidation();
      },
   },
};
</script>

<style lang="scss">
.layout {
   display: flex !important;
}
.selectable {
   display: none;
}
.v-responsive {
   flex: 8 !important;
}
.v-btn {
   margin-top: 48px !important;
   margin-bottom: 100px !important;
   span {
      font-size: 11px;
      letter-spacing: 2px;
      line-height: 72px;
      color: #ffffff;
      font-family: "Suisse Intl";
      font-weight: bold;
      text-align: center;
   }
   background-color: #262626 !important;
   width: 279px;
   height: 83px !important;
   &:after {
      content: "";
      width: 0;
   }
}

.typ-label {
   .v-input__control {
      label {
         color: white;
      }
   }
}
#input-12 {
   color: white;
}

.phone {
   color: white;
   label {
      color: white !important;
   }
}
label {
   font-size: 18px;
   color: #000000;
   font-family: "Suisse Intl";
   font-weight: 300;
}
.footer-desc {
   font-size: 18px;
   line-height: 34px;
   color: #000000;
   font-family: "Suisse Intl";
   font-weight: 300;
}
.footer-page {
   background-color: #3db565;
   .flex {
      h1 {
         padding-top: 100px;
         font-size: 34px;
         line-height: 48px;
         color: #ffffff;
         font-family: "Suisse Intl";
         font-weight: 300;
      }
   }
}
.v-responsive__content {
   width: 600px;
}
.v-image__image {
   background-position: left !important;
   background-size: contain;
}
li {
   list-style: none;
}
.content-page {
   background-color: #262626;
   .flex {
      .content-page-adress {
         h2 {
            font-size: 20px;
         }
         padding-bottom: 157px;
         ul {
            padding: 0 !important;
            li {
               font-size: 11px;
               letter-spacing: 0px;
               line-height: 20px;
               color: #ffffff;
               font-family: "Myriad Pro";
            }
         }
      }
      .content-page-country {
         padding-top: 49px;
         padding-bottom: 53px;
         ul {
            padding-left: 0 !important;
            display: flex !important;
            li {
               cursor: pointer;
               padding: 0 10px 10px 0;
               outline: none;
               font-size: 11px;
               letter-spacing: 2px;
               line-height: 72px;
               color: white;
               font-family: "Suisse Intl";
               font-weight: bold;
               &:first-child:focus {
                  color: green;
               }
            }
         }
      }

      h2 {
         font-size: 26px;
         padding-bottom: 36px;
         letter-spacing: 1px;
         line-height: 20px;
         color: #ffffff;
         font-family: "Suisse Intl";
         font-weight: 300;
      }
      h1 {
         padding-top: 100px;
         font-size: 34px;
         line-height: 48px;
         color: #ffffff !important;
         font-family: "Suisse Intl";
         font-weight: 300;
      }
   }
}
.Contacts-desc {
   padding-top: 34px;

   max-width: 500px;
   max-height: 300px;

   min-height: 70px;
   p {
      font-size: 15px;
      line-height: 28px;
      color: #333333;
      font-family: "Suisse Intl";
      font-weight: 300;
   }
}
.upper-title {
   margin-top: 50px;
   font-size: 50px;
   padding-left: 50px;
   line-height: 48px;
   color: #333333;
   font-family: "Suisse Intl";
   font-weight: 300;
}
.innner-support {
   padding-left: 10px;
}
.li-child {
   font-size: 14px;
   letter-spacing: 1px;
   text-transform: uppercase;
   color: #3db565;
   font-family: "Suisse Intl";
   font-weight: bold;
}
@media (min-width: 1280px) {
   .container {
      max-width: 1280px !important;
   }
}

@media (max-width: 860px) {
   .layout {
      flex-direction: column;
   }
   ul {
      .number {
         font-size: 20px;
      }
   }
}
@media (max-width: 591px) {
   .layout {
      .Contacts {
         .d-flex {
            .contact {
               margin-left: 0 !important;
            }
         }
      }
   }
}
.layout {
   padding-left: 54px !important;
}

.contact-number {
   padding-top: 6px !important;
   text-transform: uppercase;
   font-size: 14px !important;

   letter-spacing: 1px;
   line-height: 55px;
   color: #3db565;
   font-family: "Suisse Intl";
   font-weight: bold;
}
.contact {
   margin-left: 40px;
   @extend .adress;
   ul {
      li:nth-child(4) {
         @extend .li-child;
      }
      li:nth-child(2) {
         @extend .li-child;
      }
   }
}
.adress {
   padding-top: 43px;
   ul {
      padding: 0 !important;
      margin: 0 !important;
      li {
         font-size: 15px;
         line-height: 28px;
         color: #333333;
         font-family: "Suisse Intl";
         font-weight: 300;
      }
   }
}
.title {
   padding-top: 50px;
   display: flex;
   span {
      color: #3db565 !important;
      @extend h2;
      margin: 0 !important;
   }
   h2 {
      margin-left: 6px;
      font-size: 34px;
      line-height: 48px;
      color: #333333;
      font-family: "Suisse Intl";
      font-weight: 300;
   }
}

.number {
   font-size: 26px;
   line-height: 36px;
   color: #3db565;
   font-family: "Suisse Intl";
   font-weight: 300;
   padding-top: 40px;
   :hover {
      color: #3db565;
      text-decoration: none;
   }
}
</style>

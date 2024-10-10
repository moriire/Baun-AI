<script setup>
import { RouterView } from 'vue-router';
const user = JSON.parse(localStorage.getItem("user")).username
</script>
<template>
  <nav class="px-2 navbar navbar-expand-lg bg-warning border border-0 border-bottom border-dark sticky-top">
    <div class="container-fluid">
      <h3 class="text-center">AI Tutor</h3>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll"
        aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
    <div class="collapse navbar-collapse " id="navbarScroll">
      <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll " style="--bs-scroll-height: 100px;">
        <li class="nav-item">
          <RouterLink class="nav-link active" aria-current="page" to="/">Home</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link active" aria-current="page" to="/quiz">Quiz</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link active" aria-current="page" to="/">Dashboard</RouterLink>
        </li>
        <li class="nav-item dropdown dropstart ">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {{ user }}
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li><a type="button" class="dropdown-item" @click="logoutUser">Logout</a></li>
          </ul>
        </li>
        <!--li class="nav-item">
          <a class="nav-link" href="#">Theme</a>
        </li-->
      </ul>
    </div>
  </nav>
  <RouterView />
</template>
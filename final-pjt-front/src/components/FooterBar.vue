<template>
  <div id="footer-bar">
    <div class="container fixed-bottom">
      <footer
        class="
          d-flex
          flex-wrap
          justify-content-between
          align-items-center
          py-3
          mt-4
          border-top
        "
      >
        <div class="col-md-4 d-flex align-items-center">
          <a
            href="/"
            class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1"
          >
            <svg class="bi" width="30" height="24">
              <use xlink:href="#bootstrap"></use>
            </svg>
          </a>
          <span class="text-muted">© 2021 Albatross</span>
        </div>

        <ul
          class="
            nav
            col-md-4
            justify-content-end
            list-unstyled
            d-flex
            me-4
            pe-2
          "
        >
          <li class="ms-3">
            <a
              class="text-muted"
              href="https://lab.ssafy.com/kelvin9149/final-pjt-front"
              ><i class="fab fa-gitlab"></i
            ></a>
          </li>
        </ul>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterBar",
};
</script>

<style>
</style>
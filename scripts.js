$(document).ready(function () {
  const whileLoading = (on, id) => {
    if (on) {
        $(`${id}`).append(`
            <div class="loaderContainer d-flex align-items center">
                <div id="loading" class="d-flex spinner-border justify-content-center" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        `);
    } else {
        $(".loaderContainer").remove();
    }
  }
	$.ajax({
    url: 'https://smileschool-api.hbtn.info/quotes',
    type: 'GET',
    contentType: 'application/json',
    dataType: 'json',
    beforeSend: () => whileLoading(1, ".carousel-inner"),
    success: (homeQuotes) => {
      for (let quote of homeQuotes) {
        whileLoading();
        $('.carousel-inner').append(
          `<div class="carousel-item quote-bg py-5">
          <blockquote
            class="quote d-flex justify-content-center align-items-center px-5"
          >
            <div class="row p-5">
              <div class="col-md-4 col-lg-3 text-center">
                <img
                  class="image-quote rounded-circle"
                  src=${quote.pic_url}
                  style="width: 160px; height: 160px"
                />
              </div>
              <div class="col-md-8 col-lg-9 py-3">
                <p class="text-quote text-white mt-2">
                  « ${quote.text}
                </p>
                <p class="text-small-quote text-white mb-0">
                  <span class="text-small-bold font-weight-bold"
                    >${quote.name}</span
                  >
                  <br />
                  <span class="font-italic">${quote.title}</span>
                </p>
              </div>
            </div>
          </blockquote>
        </div>`
        );
        if (quote.id == 1) {
          $(".carousel-item").first().addClass("active");
        }
      }
    }
	});
});

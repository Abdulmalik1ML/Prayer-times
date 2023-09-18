    let cities = [
            {
                arabicName: "الرياض",
                name: "Ar Riyāḑ"
            
            },
            {
                arabicName: "مكة المكرمة",
                name: "Makkah al Mukarramah"
            
            } ,   
            {
                arabicName: "القصيم",
                name: "Al Qaşīm"
            
            },    
            {
                arabicName: "الشرقية",
                name: "Ash Sharqīyah"
            
            }    
    ]
    for (let city of cities){
        const content = `
            <option>${city.arabicName}</option>
        `
        document.getElementById("cities-select").innerHTML += content
    }
    document.getElementById("cities-select").addEventListener("change", function(){
        document.getElementById("city-name").innerHTML = this.value
        let cityName = ""
        for(let city of cities){
            if(city.arabicName == this.value){
                cityName = city.name
            }
        }
        getPrayersTimingsOfCity(cityName)
        

    })

    function getPrayersTimingsOfCity(cityName){
        let params = {
            country : "SA",
            city : cityName
        }
        axios.get('http://api.aladhan.com/v1/timingsByCity', {
            params: params
          })
          .then(function (response) {
            const timings = response.data.data.timings
    
            fillTimeForPrayer("fajr-time", timings.Fajr)
            fillTimeForPrayer("sunrise-time", timings.Sunrise)
            fillTimeForPrayer("dhuhr-time", timings.Dhuhr)
            fillTimeForPrayer("asr-time", timings.Asr)
            fillTimeForPrayer("maghrib-time", timings.Maghrib)
            fillTimeForPrayer("isha-time", timings.Isha)
    
            const readableDate = response.data.data.date.readable
            const weekDay = response.data.data.date.hijri.weekday.ar
            const date = weekDay + " " + readableDate
            document.getElementById("date").innerHTML = date
            //<!-- document.getElementById("fajr-time").innerHTML = timings.Fajr -->
            console.log(weekDay + " " + readableDate);
            console.log(response.data.data.timings);
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(function () {
            // always executed
          });
    
    }
    getPrayersTimingsOfCity("Ar Riyāḑ")
      function fillTimeForPrayer(id , time){
        document.getElementById(id).innerHTML = time

      }

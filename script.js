const backgroundSrc = [
    "1_1.png",
    "2_1.png",
    "3_1.png",
    "4_1.png",
    "5_1.png",
    "6_1.png",
    "7_1.png",
    "8_1.png",
    "9_1.png"
]

const backgroundSrcY = [
    "1.jpg",
    "2.jpg",
    "8.jpg",
    "13.jpg",
    "3.jpg",
    "12.jpg",
    "15.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
    "7.jpg",
    "9.avif",
    "10.avif",
    "11.webp",
    "14.jpg",
    "16.jpg",
]

const frontSrc = [
    "1_2.png",
    "2_2.png",
    "3_2.png",
    "4_2.png",
    "5_2.png",
    "6_2.png",
    "7_2.png",
    "8_2.png",
    "9_2.png"
]

const frontSrcY = [
    "stand_ichiban.png",
    "stand_yamai.png",
    "stand_kiryu.png",
    "stand_dwight.png",
    "stand_tomizawa.png",
    "stand_ebina.png",
    "stand_chitose.png",
    "stand_sonhi.png",
    "stand_saeko.png",
    "stand_eiji.png",
    "stand_adachi.png",
    "stand_chou.png",
    "stand_hanawa.png",
    "stand_jo.png",
    "stand_jyungi.png",
    "stand_nanba.png"
]

let backgroundIndex = 0
let frontIndex = 0

// 0 = GTA IV | 1 = Yakuza
let version = 0

showSlides()

/*********************************************
*   showSlides: Lida com as imagens
**********************************************/
function showSlides() 
{
    /*********************************************
    *   Constantes
    **********************************************/
    const backgroundImg = document.getElementById("background-img")
    const frontImg = document.getElementById("front-img")
    const blackImg = document.getElementById("black-img")
    
    /*********************************************
    *   Variáveis
    **********************************************/
    let frontLoaded = false
    let backgroundLoaded = false

    /*********************************************
    *   Código
    **********************************************/
    // Espera as imagens carregarem para poder mostrá-las
    backgroundImg.onload = function() { 
        console.log("Background loaded.");
        backgroundLoaded = true 

        if( backgroundLoaded && frontLoaded ) {
            blackImg.classList.remove("active")    
            blackImg.classList.add("hidden")
            startScene()
        }

    }

    frontImg.onload = function() { 
        console.log("Character loaded.")
        frontLoaded = true

        if( backgroundLoaded && frontLoaded ) {
            blackImg.classList.remove("active")    
            blackImg.classList.add("hidden")   
            startScene()
        }
    }

    // Posição X aleatória para o personagem
    const rndNumber = Math.random()
    if(rndNumber < 0.25)      frontImg.style.translate = "10%"
    else if(rndNumber < 0.6)  frontImg.style.translate = "20%"
    else                      frontImg.style.translate = "30%"

    // Reiniciando o fundo
    backgroundImg.style.transform = "scale(1.1)"
    
    // Fazendo as fotos do Hawaii ficarem em Preto e Brancco
    if (version == 0) {
        backgroundImg.style.filter = "grayscale(0%) blur(0px)"
    }

    if (version == 1) {
        backgroundImg.style.filter = "grayscale(100%) blur(2px)"
    }

    let path = version == 0 ? "slides/gta/" : "slides/yakuza/"
    const backgroundPathYakuza = "slides/yakuza-locations/"

    // Muda para a próxima imagem
    switch (version) {
        case 0:
            backgroundIndex %= backgroundSrc.length
            frontIndex %= frontSrc.length
            backgroundImg.src = path + backgroundSrc[backgroundIndex]

            frontImg.src = path + frontSrc[frontIndex]
            frontImg.style.maxWidth= "1400px"
            frontImg.style.width= "1400px"
            frontImg.style.height = "2000px"
            frontImg.style.bottom = "-650px"
            frontImg.style.filter = "drop-shadow(#ffffff00 0 0 0)"

            backgroundImg.style.height = "110%"
            break

        case 1:
            frontIndex %= frontSrcY.length
            backgroundIndex %= backgroundSrcY.length
            backgroundImg.src = backgroundPathYakuza + backgroundSrcY[backgroundIndex]

            frontImg.src = path + frontSrcY[frontIndex]
            frontImg.style.maxWidth= "none"
            frontImg.style.width= "1500px"
            frontImg.style.height = "auto"
            frontImg.style.bottom = "-1450px"
            if(frontSrcY[frontIndex] == "stand_eiji.png") frontImg.style.bottom = "-1200px"
            frontImg.style.filter = "drop-shadow(black 1px 1px 4px)"

            backgroundImg.style.height = "100%"
            break
    
        default:
            backgroundIndex %= backgroundSrc.length
            frontIndex %= frontSrc.length
            backgroundImg.src = path + backgroundSrc[backgroundIndex]
            frontImg.src = path + frontSrc[frontIndex]
            frontImg.style.maxWidth= "1400px"
            frontImg.style.width= "1400px"
            frontImg.style.height = "2000px"
            frontImg.style.bottom = "-650px"
            break
    }

    // É preciso sincrozinar todas as alterações em CSS.
    // setInterval faz esse papel

    // Movimentação do personagem
    let scaleFactor = 0.55
    frontImg.style.transform = "scale(0.5)"
    setTimeout(() => {
        frontImg.style.transition = "transform 10s linear, translate 6s linear" 
        frontImg.style.transform = "scale(" + scaleFactor + ")" 

        if(rndNumber < 0.25)      frontImg.style.translate = "12%"
        else if(rndNumber < 0.6)  frontImg.style.translate = "20%"
        else                      frontImg.style.translate = "28%"        

        //frontImg.style.translate = "20%"

        backgroundImg.style.transition = "transform 10s linear"
        backgroundImg.style.transform = "scale(1.0)"
    }, 500)

    // Próximo personagem e próximo papel de parede
    backgroundIndex++
    frontIndex++

    function startScene() {
        setTimeout(() => {
            blackImg.classList.add("active")    
            blackImg.classList.remove("hidden")
        }, 4500)

        setTimeout(() => {
            // Reiniciando os valores dos personagens
            frontImg.style.transition = "none"   
            frontImg.style.transform = "scale(1.0)"

            // Reiniciando os valores do fundo
            backgroundImg.style.transition = "none"
            backgroundImg.style.transform = "scale(1.1)"    

            showSlides()
        }, 6000) 
    }
}

/*********************************************
*   Configurando o áudio
**********************************************/
const audio = document.getElementById("bgm-gta")
const audioY = document.getElementById("bgm-yakuza")
const menuSounds = document.getElementById("sfx")
const playButton = document.getElementById("play-button")
const volumeSlider = document.getElementById("volume-slider")
const changer = document.getElementById("change-button")

audio.volume = 0.25
audioY.volume = 0.25 / 3
menuSounds.volume = audio.volume

audio.loop = true
audioY.loop = true

audioY.currentTime = 59.4

if( menuSounds.pause() ) {
     menuSounds.currentTime = 0
}

playButton.addEventListener("click", () => {

    menuSounds.currentTime = 2.3
    menuSounds.play()
    menuSounds.addEventListener("timeupdate", () => {
        if(menuSounds.currentTime >= 3.2) {
            menuSounds.pause()
        }
    })

    switch (version) {
        case 0:
            if(audio.paused) {
                audio.play()
                if(!audioY.paused) audioY.pause()
                playButton.textContent = "Pause"
            } else {
                audio.pause()
                playButton.textContent = "►"
            }
            break;
        case 1:
            if(audioY.paused) {
                audioY.play()
                if(!audio.paused) audio.pause()
                playButton.textContent = "Pause"
            } else {
                audioY.pause()
                playButton.textContent = "►"
            }
            break;
    
        default:
            break;
    }
})

// Slider
volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value
    audioY.volume = volumeSlider.value / 3
    menuSounds.volume = audio.volume
})

try {
    if( version == 0 ){
        audio.play()
    }

    if( version == 1 ) {
        audioY.play()
    }
} catch (error) {
    playButton.textContent = "►"
    console.log("Não foi possivel iniciar a música automaticamente. Aperte Play!")
}

if(audio.play) playButton.textContent = "Pause"
if(audio.paused) playButton.textContent = "►"

/*********************************************
*   Pra selecionar os jogos
**********************************************/
changer.addEventListener("click", () => {
    version++
    version %= 2

    menuSounds.currentTime = 2.3
    menuSounds.play()
    menuSounds.addEventListener("timeupdate", () => {
        if(menuSounds.currentTime >= 3.2) {
            menuSounds.pause()
        }
    })

    switch (version) {
        case 0:
            if(audio.paused) {
                audioY.pause()
                audioY.currentTime = 59.4
                audio.currentTime = 0
                audio.play()
            } 
            break;
        case 1:
            if(audioY.paused) {
                audioY.play()
                audioY.currentTime = 59.4
                audio.currentTime = 0
                audio.pause()
            } 
            break;
    
        default:
            break;
    }

    if( version == 0 ){
        changer.textContent = "GTA IV"
        changer.style.backgroundColor = "rgb(80, 80, 80)"
        changer.style.color = "#f59e15" 
    }

    if( version == 1 ) {
        changer.textContent = "Yakuza"
        changer.style.backgroundColor = "#af2e2e"
        changer.style.color = "#f5f5f5"
    }
})
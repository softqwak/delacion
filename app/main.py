from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse


from fastapi.templating import Jinja2Templates

app = FastAPI()

# Настройка для сервирования статических файлов
app.mount("/static", StaticFiles(directory="app/static"), name="static")

# Указываем путь до папки с шаблонами
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    # Передаем контекст в шаблон
    context = {"request": request}
    return templates.TemplateResponse("index.html", context)

@app.get("/merch", response_class=HTMLResponse)
async def index(request: Request):
    # Передаем контекст в шаблон
    context = {"request": request}
    return templates.TemplateResponse("merch.html", context)

@app.get("/concerts", response_class=HTMLResponse)
async def index(request: Request):
    # Передаем контекст в шаблон
    context = {"request": request}
    return templates.TemplateResponse("concerts.html", context)

@app.get("/concert", response_class=HTMLResponse)
async def index(request: Request, concert_id: int = None):
    # Передаем контекст в шаблон
    if concert_id:
        context = {"request": request}
        return templates.TemplateResponse("concert.html", context)
    else:
        context = {"request": request}
        templates.TemplateResponse("concerts.html", context)

@app.get("/myorders", response_class=HTMLResponse)
async def index(request: Request):
    # Передаем контекст в шаблон
    context = {"request": request}
    return templates.TemplateResponse("myorders.html", context)

@app.get("/account", response_class=HTMLResponse)
async def index(request: Request):
    # Передаем контекст в шаблон
    context = {"request": request}
    return templates.TemplateResponse("account.html", context)

@app.get("/login", response_class=HTMLResponse)
async def index(request: Request):
    # Передаем контекст в шаблон
    context = {"request": request}
    return templates.TemplateResponse("login.html", context)

@app.get("/register", response_class=HTMLResponse)
async def index(request: Request):
    # Передаем контекст в шаблон
    context = {"request": request}
    return templates.TemplateResponse("register.html", context)

@app.get("/password_reset", response_class=HTMLResponse)
async def index(request: Request):
    # Передаем контекст в шаблон
    context = {"request": request}
    return templates.TemplateResponse("password_reset.html", context)

# @app.get("/test")
# async def read_test(request: Request, num: int = 0):
#     # Можно получить информацию о запросе, если это необходимо
#     client_host = request.client.host
#     return {
#         "message": "This is a test response",
#         "status": "success",
#         "client_host": client_host,
#         "url": "hui",
#         "num+num": num+num
#     }
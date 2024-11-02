Для веб-приложения музыкальной группы можно организовать базу данных с несколькими связанными таблицами, которые охватят функционал для продаж, контента и пользовательского опыта. Вот пример структуры базы данных, которая может поддерживать указанные функции.

### Структура базы данных

1. **Таблица `users`** — Хранит информацию о пользователях.

    ```sql
    CREATE TABLE users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        is_premium BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```

    - `username` — имя пользователя.
    - `email` — адрес электронной почты.
    - `password_hash` — пароль, захешированный и защищенный солью.
    - `is_premium` — статус пользователя (обычный или премиум для доступа к уникальному контенту).

2. **Таблица `merchandise`** — Содержит информацию о товарах, доступных для покупки.

    ```sql
    CREATE TABLE merchandise (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description TEXT,
        price NUMERIC(10, 2) NOT NULL,
        stock INTEGER DEFAULT 0,
        image_url TEXT
    );
    ```

    - `name` — название товара.
    - `description` — описание товара.
    - `price` — цена товара.
    - `stock` — количество на складе.
    - `image_url` — ссылка на изображение товара.

3. **Таблица `concerts`** — Информация о концертах и билетах.

    ```sql
    CREATE TABLE concerts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        location VARCHAR(100),
        date TIMESTAMP NOT NULL,
        ticket_price NUMERIC(10, 2),
        tickets_available INTEGER DEFAULT 0
    );
    ```

    - `name` — название концерта.
    - `location` — место проведения.
    - `date` — дата и время проведения.
    - `ticket_price` — цена билета.
    - `tickets_available` — количество доступных билетов.

4. **Таблица `orders`** — Хранит заказы пользователей, включая покупку мерча и билетов.

    ```sql
    CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        total_amount NUMERIC(10, 2) NOT NULL,
        status VARCHAR(20) DEFAULT 'pending'
    );
    ```

    - `user_id` — ID пользователя, который создал заказ.
    - `total_amount` — общая сумма заказа.
    - `status` — статус заказа (`pending`, `paid`, `canceled`).

5. **Таблица `order_items`** — Хранит детали каждого заказа, указывая купленные товары или билеты.

    ```sql
    CREATE TABLE order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
        item_type VARCHAR(20) NOT NULL, -- 'merch' или 'ticket'
        item_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        price NUMERIC(10, 2) NOT NULL
    );
    ```

6. **Таблица `photos`** — Хранит ссылки на фотографии группы.

    ```sql
    CREATE TABLE photos (
        id SERIAL PRIMARY KEY,
        url TEXT NOT NULL,
        description TEXT,
        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```

7. **Таблица `exclusive_content`** — Содержит уникальный контент для премиум-пользователей.

    ```sql
    CREATE TABLE exclusive_content (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```

    - `title` — заголовок контента.
    - `content` — сам уникальный контент (текст, ссылка на видео и т. д.).

8. **Таблица `user_access_logs`** — Записывает доступ пользователей к уникальному контенту.

    ```sql
    CREATE TABLE user_access_logs (
        id SERIAL PRIMARY KEY,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        content_id INTEGER REFERENCES exclusive_content(id) ON DELETE CASCADE,
        access_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```

### Основные связи

- **Связь между `users` и `orders`** — "один ко многим", где один пользователь может иметь много заказов.
- **Связь между `orders` и `order_items`** — "один ко многим", где один заказ может содержать много позиций.
- **Связь между `concerts` и `order_items`** — позволяет пользователю покупать билеты на концерты.
- **Связь между `users` и `exclusive_content` через `user_access_logs`** — логирует доступ к уникальному контенту.

### Дополнительные возможности

- **Индексы** на ключевые поля (`user_id`, `item_id`), чтобы ускорить выборки.
- **Триггеры** для обновления `tickets_available` и `stock` при добавлении/удалении заказа.

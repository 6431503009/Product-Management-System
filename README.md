# ระบบจัดการสินค้า (Product Management System) ด้วย Node.js และ Express
Task Week 2 : Back-End Dev for Dev Init
Authors
assignment by @BorntoDev
implementation by @Chuntawat
เมื่อผู้ใช้ Run ระบบจัดการสินค้านี้ ด้วย Code
#npm run dev

ผู้ใช้จะสามารถเข้าไปอ่าน คู่มือการใช้งาน API ของระบบจัดการสินค้า ได้โดย display ผ่าน live server

![image](https://github.com/6431503009/Product-Management-System/assets/97873903/1aedc0b2-5f9c-43fa-b60f-c96740982de0)

ส่วนนี้จะเป็นหน้าตาของ ระบบสามารถ responce กับ Api end point ได้ (สามารถเลือกโหมดมืดกับสว่างได้)
![image](https://github.com/6431503009/Product-Management-System/assets/97873903/1860fa28-2036-4b3d-8c50-aa27ea06a21f)


# RESTful API สำหรับจัดการสินค้า

RESTful API นี้ถูกสร้างขึ้นโดยใช้ Express.js สำหรับจัดการรายการสินค้า มีฟังก์ชันการทำงานดังนี้:

## รายการจุดสิ้นสุดการให้บริการ (Endpoints)

### 1. POST /products
- เพิ่มสินค้าใหม่
- ต้องกำหนดค่า `name`, `category`, `price` และ `stock` ซึ่งเป็นสตริง, สตริง, จำนวนเต็ม และจำนวนเต็มตามลำดับ
- `price` และ `stock` ต้องมีค่ามากกว่า 0

![image](https://github.com/6431503009/Product-Management-System/assets/97873903/253d65c4-1ef4-4373-ab7d-0656862625b7)
  ![image](https://github.com/6431503009/Product-Management-System/assets/97873903/66521a21-0166-4aba-95f5-5708ed75916f)


### 2. POST /products/:id
- เพิ่มสินค้าใหม่ด้วยรหัสสินค้าที่กำหนด
- ต้องกำหนดค่า `name`, `category`, `price` และ `stock` เช่นเดียวกับ POST /products
- จะไม่สามารถเพิ่มสินค้าได้หากมีรหัสสินค้านั้นอยู่แล้ว

### 3. GET /products
- ดูรายการสินค้าทั้งหมด
- ![image](https://github.com/6431503009/Product-Management-System/assets/97873903/290b1399-afff-406b-86cb-72d76a8126ea)


### 4. PUT /products/:id
- แก้ไขข้อมูลสินค้า
- ต้องกำหนดค่า `name`, `category`, `price` และ `stock` ใหม่
- หากไม่พบสินค้าที่ต้องการแก้ไข จะได้รับข้อความ "ไม่พบสินค้าที่ต้องการ"
  ![image](https://github.com/6431503009/Product-Management-System/assets/97873903/548f9dec-bbcb-4d46-8f39-ed29e8dea95b)
  ![image](https://github.com/6431503009/Product-Management-System/assets/97873903/9c35d5bb-7f81-4117-af19-6fd5d2ad6e99)



### 5. DELETE /products/:id
- ลบสินค้าตามรหัสสินค้า
- หากไม่พบสินค้าที่ต้องการลบ จะได้รับข้อความ "ไม่พบสินค้าที่ต้องการ"
- ![image](https://github.com/6431503009/Product-Management-System/assets/97873903/fce12e0b-dd69-418d-80ff-c73713551a1f)
![image](https://github.com/6431503009/Product-Management-System/assets/97873903/df083f7a-9040-44c1-99a8-c7bc54dce787)


## หมายเหตุ
- ข้อมูลสินค้าจะถูกจัดเก็บในรูปแบบ Array ชั่วคราวในหน่วยความจำ
- มีการตรวจสอบค่าว่างเปล่า ประเภทข้อมูล และเงื่อนไขอื่นๆ ก่อนดำเนินการกับข้อมูล

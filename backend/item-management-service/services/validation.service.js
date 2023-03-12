class ItemValidation {
  constructor(item) {
    this.userId = item.body.userId;
    this.username = item.body.username;
    this.itemName = item.body.itemName;
    this.itemDescription = item.body.itemDescription;
    this.itemPrice = item.body.itemPrice;
    this.itemImages = item.files.map((file) => file.buffer);
  }

  async validate() {
    if (
      !this.userId ||
      !this.username ||
      !this.itemName ||
      !this.itemDescription ||
      !this.itemPrice
    ) {
      throw new Error("Some fields are missing!");
    }

    if (this.itemImages.length === 0) {
      throw new Error("Item must have at least one image!");
    }
  }

  getItem() {
    return this;
  }
}

export default ItemValidation;

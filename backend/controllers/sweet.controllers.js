import Sweet from "../models/sweet.model.js";
import User from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const addSweet = async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;

    let imageUrl = "";

    if (req.file) {
      imageUrl = await uploadOnCloudinary(req.file.path);
      if (!imageUrl) {
        return res.status(500).json({ message: "Image upload failed" });
      }
    } else {
      return res.status(400).json({ message: "Image is required" });
    }

    const sweet = await Sweet.create({
      name,
      category,
      price: Number(price),
      quantity: Number(quantity),
      image: imageUrl
    });

    res.status(201).json(sweet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSweets = async (req, res) => {
  const sweets = await Sweet.find();
  res.status(200).json(sweets);
};

export const searchSweets = async (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;

  const query = {};

  if (name) query.name = new RegExp(name, "i");
  if (category) query.category = category;
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = minPrice;
    if (maxPrice) query.price.$lte = maxPrice;
  }

  const sweets = await Sweet.find(query);
  res.status(200).json(sweets);
};

export const updateSweet = async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;
    const updates = {
      name,
      category,
      price: Number(price),
      quantity: Number(quantity)
    };

    if (req.file) {
      const imageUrl = await uploadOnCloudinary(req.file.path);
      if (!imageUrl) {
        return res.status(500).json({ message: "Image upload failed" });
      }
      updates.image = imageUrl;
    }

    const sweet = await Sweet.findByIdAndUpdate(req.params.id, updates, {
      new: true
    });

    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    res.status(200).json(sweet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSweet = async (req, res) => {
  await Sweet.findByIdAndDelete(req.params.id);
  if (!Sweet) {
    return res.status(404).json({ message: "Sweet not found" });
  }
  res.status(200).json({ message: "Sweet deleted" });
};

export const purchaseSweet = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cartItems } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    for (const item of cartItems) {
      const sweet = await Sweet.findById(item.sweetId);

      if (!sweet) {
        return res.status(404).json({ message: "Sweet not found" });
      }

      if (sweet.quantity < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${sweet.name}`
        });
      }

      sweet.quantity -= item.quantity;
      await sweet.save();

      user.purchased_items.push({
        sweet: sweet._id,
        quantity: item.quantity
      });
    }

    await user.save();

    res.status(200).json({ message: "Checkout successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const restockSweet = async (req, res) => {
  try {
    const { quantity } = req.body;

    const sweet = await Sweet.findById(req.params.id);
    if (!sweet) {
      return res.status(404).json({ message: "Sweet not found" });
    }

    sweet.quantity += Number(quantity);
    await sweet.save();

    res.status(200).json(sweet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

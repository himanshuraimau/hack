'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useAuth } from '@/hooks/useAuth';
import Navbar from '@/components/dashboard/Navbar';
import { Thermometer, Droplets, MapPin, Clock, Package } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8000/api/v1';

interface DeviceData {
  _id: string;
  device?: {
    _id: string;
    deviceName: string;
  };
  temperature?: number;
  humidity?: number;
  location?: {
    latitude: number;
    longitude: number;
  };
  createdAt: string;
  updatedAt: string;
}

interface Product {
  id: string;
  name: string;
  source: string;
  destination: string;
  purchaseDate: string;
  expiryDate: string;
}

function ProductsTable({ products }: { products: Product[] }) {
  return (
    <div className="border rounded-lg mt-8 overflow-hidden bg-white/50 backdrop-blur-sm shadow-lg">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/50">
            <TableHead className="font-semibold">Product Name</TableHead>
            <TableHead className="font-semibold">Source</TableHead>
            <TableHead className="font-semibold">Destination</TableHead>
            <TableHead className="font-semibold">Purchase Date</TableHead>
            <TableHead className="font-semibold">Expiry Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                <Package className="w-6 h-6 mx-auto mb-2 opacity-50" />
                No products added yet
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.id} className="hover:bg-gray-50/50 transition-colors">
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.source}</TableCell>
                <TableCell>{product.destination}</TableCell>
                <TableCell>{product.purchaseDate}</TableCell>
                <TableCell>{product.expiryDate}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function AddProductModal({ isOpen, onClose, onAddProduct }: {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Omit<Product, 'id'>) => void;
}) {
  const [formData, setFormData] = useState({
    name: '',
    source: '',
    destination: '',
    purchaseDate: '',
    expiryDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProduct(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="source" className="text-right">
                Source
              </Label>
              <Input
                id="source"
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="destination" className="text-right">
                Destination
              </Label>
              <Input
                id="destination"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="purchaseDate" className="text-right">
                Purchase Date
              </Label>
              <Input
                id="purchaseDate"
                type="date"
                value={formData.purchaseDate}
                onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expiryDate" className="text-right">
                Expiry Date
              </Label>
              <Input
                id="expiryDate"
                type="date"
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Product</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default function DeviceDetails() {
  const params = useParams();
  const deviceId = params?.id as string;
  const { auth } = useAuth();
  const [deviceData, setDeviceData] = useState<DeviceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  useEffect(() => {
    const fetchDeviceData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_BASE_URL}/device-data/${deviceId}`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });

        console.log('Device data response:', response.data);

        if (Array.isArray(response.data) && response.data.length > 0) {
          setDeviceData(response.data[0]);
        } else {
          throw new Error('No data available for this device');
        }
      } catch (err) {
        console.error('Failed to fetch device data:', err);
        setError('Could not load device data');
        toast.error('Failed to load device data');
      } finally {
        setIsLoading(false);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products/${deviceId}`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setProducts(response.data.products);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        toast.error('Failed to load products');
      }
    };

    if (deviceId && auth.token) {
      fetchDeviceData();
      fetchProducts();
    }
  }, [deviceId, auth.token]);

  const handleAddProduct = async (newProduct: Omit<Product, 'id'>) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/products/${deviceId}`,
        newProduct,
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      setProducts([...products, response.data.product]);
      toast.success('Product added successfully');
    } catch (err) {
      console.error('Failed to add product:', err);
      toast.error('Failed to add product');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error || !deviceData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <Navbar />
        <div className="flex flex-col justify-center items-center h-[calc(100vh-64px)]">
          <p className="text-red-500 mb-4">{error || 'No data available'}</p>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navbar />
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            {deviceData?.device?.deviceName || 'Unknown Device'}
          </h1>
          <Button 
            onClick={() => window.history.back()}
            variant="outline"
            className="hover:bg-gray-100"
          >
            Back
          </Button>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-xl p-6 mt-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Thermometer className="w-6 h-6 text-blue-600" />
                <h3 className="font-medium text-lg text-blue-900">Temperature</h3>
              </div>
              <p className="text-4xl font-bold text-blue-800">
                {deviceData?.temperature ?? 'N/A'}
                <span className="text-2xl ml-1">°C</span>
              </p>
            </div>

            <div className="p-6 bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Droplets className="w-6 h-6 text-green-600" />
                <h3 className="font-medium text-lg text-green-900">Humidity</h3>
              </div>
              <p className="text-4xl font-bold text-green-800">
                {deviceData?.humidity ?? 'N/A'}
                <span className="text-2xl ml-1">%</span>
              </p>
            </div>
          </div>

          {deviceData?.location && (
            <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-5 h-5 text-gray-600" />
                <h3 className="font-medium text-gray-900">Location</h3>
              </div>
              <p className="text-lg text-gray-700">
                {deviceData.location.latitude}, {deviceData.location.longitude}
              </p>
            </div>
          )}

          <div className="flex items-center gap-2 text-sm text-gray-600 border-t pt-4">
            <Clock className="w-4 h-4" />
            Last Updated: {deviceData?.updatedAt
              ? new Date(deviceData.updatedAt).toLocaleString()
              : 'Never'}
          </div>
        </div>

        <div className="mt-12 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Package className="w-6 h-6" />
              Products
            </h2>
            <Button 
              onClick={() => setIsAddProductModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
            >
              Add Product
            </Button>
          </div>

          <ProductsTable products={products} />
        </div>

        <AddProductModal
          isOpen={isAddProductModalOpen}
          onClose={() => setIsAddProductModalOpen(false)}
          onAddProduct={handleAddProduct}
        />
      </main>
    </div>
  );
}


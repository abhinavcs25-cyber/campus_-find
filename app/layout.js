import './globals.css';
import { ItemProvider } from '../context/ItemContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Toast from '../components/Toast';

export const metadata = {
  title: 'CampusFind – Campus Lost and Found System',
  description: 'Lost something on campus? Find it here. The campus-exclusive lost and found portal for students, faculty, and campus security.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background text-mainText min-h-screen flex flex-col antialiased">
        <ItemProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Toast />
        </ItemProvider>
      </body>
    </html>
  );
}


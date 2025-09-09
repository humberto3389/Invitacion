import { motion } from 'framer-motion'

export default function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-12 text-center">
      <motion.h2
        initial={{ y: 14, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="font-display text-4xl"
      >
        {children}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6 }}
        className="mx-auto mt-3 h-1 w-24 origin-left rounded-full bg-gold"
      />
    </div>
  )
}



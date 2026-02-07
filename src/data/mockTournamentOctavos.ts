import type { Tournament } from "@/types/tournament";

export const mockTournamentOctavos: Tournament = {
  id: "10",
  name: "Torneo Master 1000",
  startDate: "2026-02-10",
  endDate: "2026-02-20",
  location: "Club Los Naranjos, Mar del Plata",
  categories: ["1ra", "2da", "3ra"],
  genders: ["masculino"],
  status: "en-curso",
  content: `
    <p>El <strong>Torneo Master 1000</strong> reúne a las mejores parejas del circuito en un evento sin precedentes en la ciudad.</p>
    <ul>
      <li><strong>Premios:</strong> $5.000.000 a repartir + Puntos AJPP</li>
      <li><strong>Sede:</strong> Club Los Naranjos (Cancha de cristal panorámica)</li>
      <li><strong>Transmisión:</strong> Streaming en vivo desde Octavos de Final</li>
    </ul>
  `,
  subtournaments: [
    {
      category: "1ra",
      gender: "masculino",
      champion: undefined,
      zones: [
        // Zona A (Ejemplo con datos)
        {
          id: "z1",
          name: "Zona A",
          matches: [],
          pairs: [
            {
              id: "p1",
              player1: { name: "Arturo", lastName: "Coello" },
              player2: { name: "Agustín", lastName: "Tapia" },
              points: 9,
            },
            {
              id: "p2",
              player1: { name: "Martín", lastName: "Di Nenno" },
              player2: { name: "Franco", lastName: "Stupaczuk" },
              points: 6,
            },
          ],
        },
      ],
      bracket: [
        {
          id: "r16",
          name: "Octavos de Final",
          matches: [
            {
              id: "r16-1",
              pair1: {
                id: "p1",
                player1: { name: "A.", lastName: "Coello" },
                player2: { name: "A.", lastName: "Tapia" },
              },
              pair2: {
                id: "p16",
                player1: { name: "J.", lastName: "Muñoz" },
                player2: { name: "J.", lastName: "García" },
              }, // Wildcard
              status: "finished",
              score: {
                set1: { pair1: 6, pair2: 1 },
                set2: { pair1: 6, pair2: 2 },
              },
              winner: 1,
              date: "15 Feb",
              time: "10:00",
              court: "Central",
            },
            {
              id: "r16-2",
              pair1: {
                id: "p8",
                player1: { name: "L.", lastName: "Capra" },
                player2: { name: "M.", lastName: "Sánchez" },
              },
              pair2: {
                id: "p9",
                player1: { name: "J.", lastName: "Nieto" },
                player2: { name: "J.", lastName: "Sanz" },
              },
              status: "finished",
              score: {
                set1: { pair1: 4, pair2: 6 },
                set2: { pair1: 6, pair2: 4 },
                set3: { pair1: 6, pair2: 7 },
              },
              winner: 2,
              date: "15 Feb",
              time: "11:30",
              court: "Cancha 2",
            },
            {
              id: "r16-3",
              pair1: {
                id: "p5",
                player1: { name: "F.", lastName: "Navarro" },
                player2: { name: "J.", lastName: "Lebrón" },
              },
              pair2: {
                id: "p12",
                player1: { name: "R.", lastName: "Moyano" },
                player2: { name: "F.", lastName: "Gil" },
              },
              status: "finished",
              score: {
                set1: { pair1: 6, pair2: 3 },
                set2: { pair1: 6, pair2: 4 },
              },
              winner: 1,
              date: "15 Feb",
              time: "13:00",
              court: "Central",
            },
            {
              id: "r16-4",
              pair1: {
                id: "p4",
                player1: { name: "A.", lastName: "Ruiz" },
                player2: { name: "J.", lastName: "Tello" },
              },
              pair2: {
                id: "p13",
                player1: { name: "V.", lastName: "Libaak" },
                player2: { name: "L.", lastName: "Augsburger" },
              },
              status: "finished",
              score: {
                set1: { pair1: 6, pair2: 7 },
                set2: { pair1: 4, pair2: 6 },
              },
              winner: 2,
              date: "15 Feb",
              time: "14:30",
              court: "Cancha 2",
            },
            {
              id: "r16-5",
              pair1: {
                id: "p3",
                player1: { name: "F.", lastName: "Stupaczuk" },
                player2: { name: "M.", lastName: "Di Nenno" },
              },
              pair2: {
                id: "p14",
                player1: { name: "L.", lastName: "Bergamini" },
                player2: { name: "V.", lastName: "Ruiz" },
              },
              status: "finished",
              score: {
                set1: { pair1: 6, pair2: 2 },
                set2: { pair1: 6, pair2: 3 },
              },
              winner: 1,
              date: "15 Feb",
              time: "16:00",
              court: "Central",
            },
            {
              id: "r16-6",
              pair1: {
                id: "p6",
                player1: { name: "F.", lastName: "Chingotto" },
                player2: { name: "A.", lastName: "Galán" },
              },
              pair2: {
                id: "p11",
                player1: { name: "J.", lastName: "Garrido" },
                player2: { name: "M.", lastName: "Yanguas" },
              },
              status: "finished",
              score: {
                set1: { pair1: 7, pair2: 6 },
                set2: { pair1: 6, pair2: 4 },
              },
              winner: 1,
              date: "15 Feb",
              time: "17:30",
              court: "Cancha 2",
            },
            {
              id: "r16-7",
              pair1: {
                id: "p7",
                player1: { name: "M.", lastName: "González" },
                player2: { name: "S.", lastName: "Gutiérrez" },
              },
              pair2: {
                id: "p10",
                player1: { name: "A.", lastName: "Arroyo" },
                player2: { name: "E.", lastName: "Alonso" },
              },
              status: "finished",
              score: {
                set1: { pair1: 6, pair2: 4 },
                set2: { pair1: 4, pair2: 6 },
                set3: { pair1: 6, pair2: 3 },
              },
              winner: 1,
              date: "15 Feb",
              time: "19:00",
              court: "Central",
            },
            {
              id: "r16-8",
              pair1: {
                id: "p2",
                player1: { name: "F.", lastName: "Belasteguín" },
                player2: { name: "L.", lastName: "Díaz" },
              },
              pair2: {
                id: "p15",
                player1: { name: "G.", lastName: "Rubio" },
                player2: { name: "P.", lastName: "Lijó" },
              },
              status: "finished",
              score: {
                set1: { pair1: 6, pair2: 2 },
                set2: { pair1: 6, pair2: 1 },
              },
              winner: 1,
              date: "15 Feb",
              time: "20:30",
              court: "Central",
            },
          ],
        },
        {
          id: "qf",
          name: "Cuartos de Final",
          matches: [
            {
              id: "qf-1",
              pair1: {
                id: "p1",
                player1: { name: "A.", lastName: "Coello" },
                player2: { name: "A.", lastName: "Tapia" },
              },
              pair2: {
                id: "p9",
                player1: { name: "J.", lastName: "Nieto" },
                player2: { name: "J.", lastName: "Sanz" },
              },
              status: "finished",
              score: {
                set1: { pair1: 6, pair2: 3 },
                set2: { pair1: 6, pair2: 3 },
              },
              winner: 1,
              date: "16 Feb",
              time: "14:00",
              court: "Central",
            },
            {
              id: "qf-2",
              pair1: {
                id: "p5",
                player1: { name: "F.", lastName: "Navarro" },
                player2: { name: "J.", lastName: "Lebrón" },
              },
              pair2: {
                id: "p13",
                player1: { name: "V.", lastName: "Libaak" },
                player2: { name: "L.", lastName: "Augsburger" },
              },
              status: "finished",
              score: {
                set1: { pair1: 7, pair2: 6 },
                set2: { pair1: 3, pair2: 6 },
                set3: { pair1: 6, pair2: 4 },
              },
              winner: 1,
              date: "16 Feb",
              time: "15:30",
              court: "Central",
            },
            {
              id: "qf-3",
              pair1: {
                id: "p3",
                player1: { name: "F.", lastName: "Stupaczuk" },
                player2: { name: "M.", lastName: "Di Nenno" },
              },
              pair2: {
                id: "p6",
                player1: { name: "F.", lastName: "Chingotto" },
                player2: { name: "A.", lastName: "Galán" },
              },
              status: "pending",
              date: "16 Feb",
              time: "17:00",
              court: "Central",
            },
            {
              id: "qf-4",
              pair1: {
                id: "p7",
                player1: { name: "M.", lastName: "González" },
                player2: { name: "S.", lastName: "Gutiérrez" },
              },
              pair2: {
                id: "p2",
                player1: { name: "F.", lastName: "Belasteguín" },
                player2: { name: "L.", lastName: "Díaz" },
              },
              status: "pending",
              date: "16 Feb",
              time: "18:30",
              court: "Central",
            },
          ],
        },
        {
          id: "sf",
          name: "Semifinales",
          matches: [
            {
              id: "sf-1",
              pair1: {
                id: "p1",
                player1: { name: "A.", lastName: "Coello" },
                player2: { name: "A.", lastName: "Tapia" },
              },
              pair2: {
                id: "p5",
                player1: { name: "F.", lastName: "Navarro" },
                player2: { name: "J.", lastName: "Lebrón" },
              },
              status: "pending",
              date: "17 Feb",
              time: "18:00",
              court: "Central",
            },
            {
              id: "sf-2",
              pair1: null,
              pair2: null,
              status: "pending",
              date: "17 Feb",
              time: "20:00",
              court: "Central",
            },
          ],
        },
        {
          id: "f",
          name: "Final",
          matches: [
            {
              id: "f-1",
              pair1: null,
              pair2: null,
              status: "pending",
              date: "18 Feb",
              time: "19:00",
              court: "Central",
            },
          ],
        },
      ],
    },
    // Subtorneo 2da Categoría (Cuartos de final)
    {
      category: "2da",
      gender: "masculino",
      zones: [],
      bracket: [
        {
          id: "qf",
          name: "Cuartos de Final",
          matches: Array.from({ length: 4 }).map((_, i) => ({
            id: `qf-2da-${i}`,
            pair1: {
              id: `p2da-${i}a`,
              player1: { name: "Jugador", lastName: `Local ${i}` },
              player2: { name: "Jugador", lastName: "X" },
            },
            pair2: {
              id: `p2da-${i}b`,
              player1: { name: "Jugador", lastName: `Visitante ${i}` },
              player2: { name: "Jugador", lastName: "Y" },
            },
            status: "finished",
            winner: 1,
            score: {
              set1: { pair1: 6, pair2: 4 },
              set2: { pair1: 6, pair2: 4 },
            },
          })),
        },
        { id: "sf", name: "Semifinales", matches: [] }, // Simplificado para ahorrar espacio
        { id: "f", name: "Final", matches: [] },
      ],
    },
  ],
};

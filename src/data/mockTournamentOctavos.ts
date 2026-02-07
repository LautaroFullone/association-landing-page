import type { Tournament } from "@/types/tournament";

// Define pairs separately to reuse them
const p1 = {
  id: "p1",
  player1: { name: "Arturo", lastName: "Coello" },
  player2: { name: "Agustín", lastName: "Tapia" },
  points: 0,
};
const p2 = {
  id: "p2",
  player1: { name: "Fernando", lastName: "Belasteguín" },
  player2: { name: "L.", lastName: "Díaz" },
  points: 0,
};
const p3 = {
  id: "p3",
  player1: { name: "Franco", lastName: "Stupaczuk" },
  player2: { name: "Martín", lastName: "Di Nenno" },
  points: 0,
};
const p4 = {
  id: "p4",
  player1: { name: "Alex", lastName: "Ruiz" },
  player2: { name: "Juan", lastName: "Tello" },
  points: 0,
};
const p5 = {
  id: "p5",
  player1: { name: "Paquito", lastName: "Navarro" },
  player2: { name: "Juan", lastName: "Lebrón" },
  points: 0,
};
const p6 = {
  id: "p6",
  player1: { name: "Fede", lastName: "Chingotto" },
  player2: { name: "Ale", lastName: "Galán" },
  points: 0,
};
const p7 = {
  id: "p7",
  player1: { name: "Momo", lastName: "González" },
  player2: { name: "Sanyo", lastName: "Gutiérrez" },
  points: 0,
};
const p8 = {
  id: "p8",
  player1: { name: "Lucho", lastName: "Capra" },
  player2: { name: "Maxi", lastName: "Sánchez" },
  points: 0,
};
const p9 = {
  id: "p9",
  player1: { name: "Coki", lastName: "Nieto" },
  player2: { name: "Jon", lastName: "Sanz" },
  points: 0,
};
const p10 = {
  id: "p10",
  player1: { name: "Alex", lastName: "Arroyo" },
  player2: { name: "Edu", lastName: "Alonso" },
  points: 0,
};
const p11 = {
  id: "p11",
  player1: { name: "Javi", lastName: "Garrido" },
  player2: { name: "Mike", lastName: "Yanguas" },
  points: 0,
};
const p12 = {
  id: "p12",
  player1: { name: "Ramiro", lastName: "Moyano" },
  player2: { name: "Francisco", lastName: "Gil" },
  points: 0,
};
const p13 = {
  id: "p13",
  player1: { name: "Tino", lastName: "Libaak" },
  player2: { name: "Leo", lastName: "Augsburger" },
  points: 0,
};
const p14 = {
  id: "p14",
  player1: { name: "Lucas", lastName: "Bergamini" },
  player2: { name: "Víctor", lastName: "Ruiz" },
  points: 0,
};
const p15 = {
  id: "p15",
  player1: { name: "Gonzalo", lastName: "Rubio" },
  player2: { name: "Pablo", lastName: "Lijó" },
  points: 0,
};
const p16 = {
  id: "p16",
  player1: { name: "Javier", lastName: "Muñoz" },
  player2: { name: "Javier", lastName: "García" },
  points: 0,
};

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
        {
          id: "z1",
          name: "Zona A",
          pairs: [p1, p16, p8, p9],
          matches: [
            {
              id: "m-z1-1",
              pair1: p1,
              pair2: p16,
              status: "finished",
              score: {
                set1: { pair1: 6, pair2: 2 },
                set2: { pair1: 6, pair2: 1 },
              },
              date: "12 Feb",
              time: "10:00",
              court: "Central",
              winner: 1,
            },
            {
              id: "m-z1-2",
              pair1: p8,
              pair2: p9,
              status: "finished",
              score: {
                set1: { pair1: 4, pair2: 6 },
                set2: { pair1: 6, pair2: 4 },
                set3: { pair1: 3, pair2: 6 },
              },
              date: "12 Feb",
              time: "11:30",
              court: "Cancha 2",
              winner: 2,
            },
            {
              id: "m-z1-3",
              pair1: p1,
              pair2: p8,
              status: "finished",
              score: {
                set1: { pair1: 6, pair2: 3 },
                set2: { pair1: 6, pair2: 4 },
              },
              date: "13 Feb",
              time: "10:00",
              court: "Central",
              winner: 1,
            },
            {
              id: "m-z1-4",
              pair1: p16,
              pair2: p9,
              status: "finished",
              score: {
                set1: { pair1: 3, pair2: 6 },
                set2: { pair1: 4, pair2: 6 },
              },
              date: "13 Feb",
              time: "11:30",
              court: "Cancha 2",
              winner: 2,
            },
            {
              id: "m-z1-5",
              pair1: p1,
              pair2: p9,
              status: "finished",
              score: {
                set1: { pair1: 6, pair2: 4 },
                set2: { pair1: 7, pair2: 5 },
              },
              date: "14 Feb",
              time: "10:00",
              court: "Central",
              winner: 1,
            },
            {
              id: "m-z1-6",
              pair1: p16,
              pair2: p8,
              status: "finished",
              score: {
                set1: { pair1: 2, pair2: 6 },
                set2: { pair1: 3, pair2: 6 },
              },
              date: "14 Feb",
              time: "11:30",
              court: "Cancha 2",
              winner: 2,
            },
          ],
        },
        {
          id: "z2",
          name: "Zona B",
          pairs: [p5, p12, p4, p13],
          matches: [
            {
              id: "m-z2-1",
              pair1: p5,
              pair2: p12,
              status: "finished",
              score: {
                set1: { pair1: 6, pair2: 3 },
                set2: { pair1: 6, pair2: 4 },
              },
              date: "12 Feb",
              time: "13:00",
              court: "Central",
              winner: 1,
            },
            {
              id: "m-z2-2",
              pair1: p4,
              pair2: p13,
              status: "finished",
              score: {
                set1: { pair1: 6, pair2: 7 },
                set2: { pair1: 6, pair2: 4 },
                set3: { pair1: 4, pair2: 6 },
              },
              date: "12 Feb",
              time: "14:30",
              court: "Cancha 2",
              winner: 2,
            },
            {
              id: "m-z2-3",
              pair1: p5,
              pair2: p4,
              status: "finished",
              score: {
                set1: { pair1: 6, pair2: 2 },
                set2: { pair1: 6, pair2: 3 },
              },
              date: "13 Feb",
              time: "13:00",
              court: "Central",
              winner: 1,
            },
            {
              id: "m-z2-4",
              pair1: p12,
              pair2: p13,
              status: "finished",
              score: {
                set1: { pair1: 4, pair2: 6 },
                set2: { pair1: 5, pair2: 7 },
              },
              date: "13 Feb",
              time: "14:30",
              court: "Cancha 2",
              winner: 2,
            },
            {
              id: "m-z2-5",
              pair1: p5,
              pair2: p13,
              status: "finished",
              score: {
                set1: { pair1: 7, pair2: 5 },
                set2: { pair1: 6, pair2: 4 },
              },
              date: "14 Feb",
              time: "13:00",
              court: "Central",
              winner: 1,
            },
            {
              id: "m-z2-6",
              pair1: p12,
              pair2: p4,
              status: "finished",
              score: {
                set1: { pair1: 3, pair2: 6 },
                set2: { pair1: 4, pair2: 6 },
              },
              date: "14 Feb",
              time: "14:30",
              court: "Cancha 2",
              winner: 2,
            },
          ],
        },
        {
          id: "z3",
          name: "Zona C",
          pairs: [p3, p14, p6, p11],
          matches: [
            {
              id: "m-z3-1",
              pair1: p3,
              pair2: p14,
              status: "finished",
              score: {
                set1: { pair1: 6, pair2: 2 },
                set2: { pair1: 6, pair2: 3 },
              },
              date: "12 Feb",
              time: "16:00",
              court: "Central",
              winner: 1,
            },
            {
              id: "m-z3-2",
              pair1: p6,
              pair2: p11,
              status: "finished",
              score: {
                set1: { pair1: 7, pair2: 6 },
                set2: { pair1: 6, pair2: 4 },
              },
              date: "12 Feb",
              time: "17:30",
              court: "Cancha 2",
              winner: 1,
            },
            {
              id: "m-z3-3",
              pair1: p3,
              pair2: p6,
              status: "finished",
              score: {
                set1: { pair1: 6, pair2: 4 },
                set2: { pair1: 3, pair2: 6 },
                set3: { pair1: 6, pair2: 3 },
              },
              date: "13 Feb",
              time: "16:00",
              court: "Central",
              winner: 1,
            },
            {
              id: "m-z3-4",
              pair1: p14,
              pair2: p11,
              status: "finished",
              score: {
                set1: { pair1: 4, pair2: 6 },
                set2: { pair1: 3, pair2: 6 },
              },
              date: "13 Feb",
              time: "17:30",
              court: "Cancha 2",
              winner: 2,
            },
            {
              id: "m-z3-5",
              pair1: p3,
              pair2: p11,
              status: "finished",
              score: {
                set1: { pair1: 6, pair2: 3 },
                set2: { pair1: 6, pair2: 3 },
              },
              date: "14 Feb",
              time: "16:00",
              court: "Central",
              winner: 1,
            },
            {
              id: "m-z3-6",
              pair1: p14,
              pair2: p6,
              status: "finished",
              score: {
                set1: { pair1: 2, pair2: 6 },
                set2: { pair1: 1, pair2: 6 },
              },
              date: "14 Feb",
              time: "17:30",
              court: "Cancha 2",
              winner: 2,
            },
          ],
        },
        {
          id: "z4",
          name: "Zona D",
          pairs: [p7, p10, p2, p15],
          matches: [
            {
              id: "m-z4-1",
              pair1: p7,
              pair2: p10,
              status: "finished",
              score: {
                set1: { pair1: 6, pair2: 4 },
                set2: { pair1: 4, pair2: 6 },
                set3: { pair1: 6, pair2: 3 },
              },
              date: "12 Feb",
              time: "19:00",
              court: "Central",
              winner: 1,
            },
            {
              id: "m-z4-2",
              pair1: p2,
              pair2: p15,
              status: "finished",
              score: {
                set1: { pair1: 6, pair2: 2 },
                set2: { pair1: 6, pair2: 1 },
              },
              date: "12 Feb",
              time: "20:30",
              court: "Central",
              winner: 1,
            },
            {
              id: "m-z4-3",
              pair1: p7,
              pair2: p2,
              status: "finished",
              score: {
                set1: { pair1: 4, pair2: 6 },
                set2: { pair1: 5, pair2: 7 },
              },
              date: "13 Feb",
              time: "19:00",
              court: "Central",
              winner: 2,
            },
            {
              id: "m-z4-4",
              pair1: p10,
              pair2: p15,
              status: "finished",
              score: {
                set1: { pair1: 6, pair2: 3 },
                set2: { pair1: 6, pair2: 4 },
              },
              date: "13 Feb",
              time: "20:30",
              court: "Central",
              winner: 1,
            },
            {
              id: "m-z4-5",
              pair1: p7,
              pair2: p15,
              status: "finished",
              score: {
                set1: { pair1: 6, pair2: 2 },
                set2: { pair1: 6, pair2: 2 },
              },
              date: "14 Feb",
              time: "19:00",
              court: "Central",
              winner: 1,
            },
            {
              id: "m-z4-6",
              pair1: p10,
              pair2: p2,
              status: "finished",
              score: {
                set1: { pair1: 3, pair2: 6 },
                set2: { pair1: 4, pair2: 6 },
              },
              date: "14 Feb",
              time: "20:30",
              court: "Central",
              winner: 2,
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
              pair1: p1,
              pair2: p16,
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
              pair1: p8,
              pair2: p9,
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
              pair1: p5,
              pair2: p12,
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
              pair1: p4,
              pair2: p13,
              status: "finished",
              score: {
                set1: { pair1: 6, pair2: 7 },
                set2: { pair1: 4, pair2: 6 },
              },
              winner: 2,
              date: "15 Feb",
            },
            {
              id: "qf-4",
              pair1: p7,
              pair2: p2,
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
              pair1: p1,
              pair2: p5,
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
            pair1Id: `p2da-${i}a`,
            pair2Id: `p2da-${i}b`,
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

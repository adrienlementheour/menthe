<template>
    <div ref="wrapperCanvas" class="wrapper-canvas">
        <canvas ref="canvas" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            canvas: null,
            wrapperCanvas: null,
            ctx: null
        };
    },
    computed: {
        windowWidth() {
            if (!this.$store.state.superWindow) return Infinity;
            return this.$store.state.superWindow.width;
        },
        windowHeight() {
            if (!this.$store.state.superWindow) return Infinity;
            return this.$store.state.superWindow.height;
        },
        paths() {
            return this.$store.state.paths;
        }
    },
    watch: {
        windowWidth() {
            this.updateCanvasSize();
        },
        windowHeight() {
            this.updateCanvasSize();
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.wrapperCanvas = this.$refs.wrapperCanvas;
            this.canvas = this.$refs.canvas;
            this.ctx = this.canvas.getContext('2d');
            this.updateCanvasSize();
            this.render();
        });
    },
    methods: {
        drawPath(path) {
            this.drawLine(path);
            // this.drawCircle(path.x, path.y);
            this.drawCircle(path.x2, path.y2);
        },
        drawCircle(x, y) {
            this.ctx.beginPath();
            this.ctx.arc(x, y, 5, 0, 2 * Math.PI);
            this.ctx.fill();
        },
        drawLine({ x, y, x2, y2 }) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, y);
            this.ctx.lineTo(x2, y2);
            this.ctx.stroke();
        },
        render() {
            // On clear le canvas
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            // this.ctx.globalCompositeOperation = 'soft-light';
            this.ctx.fillStyle = '#01A85E';
            this.ctx.strokeStyle = '#01A85E';
            this.ctx.lineWidth = 1;
            // On dessine toutes les formes
            this.drawEverything();
            requestAnimationFrame(() => {
                this.render();
            });
        },
        drawEverything() {
            // On va boucler sur this.paths, on doit dessiner tout ce qu'il y a dedans
            for (let i = 0, len = this.paths.length; i < len; i++) {
                // On dessine le path grace à son point de départ et celui d'arrivée
                this.drawPath(this.paths[i]);
            }
        },
        updateCanvasSize() {
            const bbox = this.canvas.getBoundingClientRect();
            this.canvas.width = bbox.width;
            this.canvas.height = bbox.height;
        }
    }
};
</script>

<style lang="scss" scoped>
.wrapper-canvas {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
    z-index: 2;
    canvas {
        width: 100%;
        height: 100%;
    }
}
</style>
